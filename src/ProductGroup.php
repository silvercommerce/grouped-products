<?php

namespace SilverCommerce\GroupedProducts;

use Product;
use SilverCommerce\CatalogueAdmin\Forms\GridField\GridFieldConfig_CatalogueRelated;

/**
 * Product that acts as a "Parent" for a grouping of products
 */
class ProductGroup extends Product
{
    private static $table_name = 'ProductGroup';

    /**
     * Human-readable singular name.
     * @var string
     * @config
     */
    private static $singular_name = 'Product Group';

    /**
     * Human-readable plural name
     * @var string
     * @config
     */
    private static $plural_name = 'Product Groups';
    
    /**
     * Description for this object that will get loaded by the website
     * when it comes to creating it for the first time.
     *
     * @var string
     * @config
     */
    private static $description = "'Parent' for a grouping of products";

    private static $has_many = [
        'Products' => GroupedProduct::class
    ];

    public function getSortedProducts()
    {
        return $this->Products()->sort('SortOrder', 'ASC');
    }

    /**
     * Update the default products gridfield to use custom config
     *
     * @return \SilverStripe\Forms\FieldList
     */
    public function getCMSFields()
    {
        $self = $this;

        $this->beforeUpdateCMSFields(
            function ($fields) use ($self) {
                $products_field = $fields->dataFieldByName('Products');
                
                if (!empty($products_field)) {
                    $products_field->setConfig(
                        GridFieldConfig_CatalogueRelated::create(
                            GroupedProduct::class,
                            null,
                            GroupedProduct::GROUP_SORT_FIELD,
                            true
                        )
                    );
                }
            }
        );

        return parent::getCMSFields();
    }
}

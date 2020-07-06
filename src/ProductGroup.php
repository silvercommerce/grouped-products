<?php

namespace SilverCommerce\GroupedProducts;

use Product;
use SilverStripe\Control\HTTPRequest;
use SilverStripe\Core\Injector\Injector;
use SilverCommerce\CatalogueAdmin\Forms\GridField\GridFieldConfig_CatalogueRelated;
use SilverStripe\ORM\ArrayList;

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
     * Compile sorted images from all children
     *
     * @return \SilverStripe\ORM\SS_List
     */
    public function SortedImages()
    {
        $images = ArrayList::create();
        $images->merge(parent::SortedImages());

        foreach($this->getSortedProducts() as $product) {
            if ($product->Images()->exists()) {
                $images->merge($product->SortedImages());
            }
        }

        return $images;
    }

    /**
     * Are we viewing a child of this product group?
     *
     * @return GroupedProduct|null 
     */
    protected function getProductFromRequest()
    {
        $request = Injector::inst()->get(HTTPRequest::class);
        $p = $request->getVar('p');
        $grouped = null;

        if (!empty($p)) {
            $grouped = $this->Products()->find('URLSegment', $p);
        }

        if (!empty($grouped)) {
            return $grouped;
        }

        return;
    }

    /**
     * If viewing a grouped product, we want to return that product's price
     *
     * @return float
     */
    public function getNoTaxPrice()
    {
        $grouped = $this->getProductFromRequest();

        if (!empty($grouped) && $grouped->dbObject('BasePrice')->getValue() > 0) {
            return $grouped->getNoTaxPrice();
        }
        
        return parent::getNoTaxPrice();
    }

    /**
     * If viewing a grouped product, we want to return that product's tax
     *
     * @return float
     */
    public function getTaxAmount()
    {
        $grouped = $this->getProductFromRequest();

        if (!empty($grouped) && $grouped->dbObject('BasePrice')->getValue() > 0) {
            return $grouped->getTaxAmount();
        }
        
        return parent::getTaxAmount();
    }

    /**
     * If viewing a grouped product, we want to return that product's tax string
     *
     * @return string
     */
    public function getTaxString($include_tax = null)
    {
        $grouped = $this->getProductFromRequest();

        if (!empty($grouped) && $grouped->dbObject('BasePrice')->getValue() > 0) {
            return $grouped->getTaxString($include_tax);
        }
        
        return parent::getTaxString($include_tax);
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

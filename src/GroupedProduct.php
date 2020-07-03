<?php

namespace SilverCommerce\GroupedProducts;

use Product;

/**
 * "Children" products of a product grouping
 */
class GroupedProduct extends Product
{
    const GROUP_SORT_FIELD = 'SortOrder';

    private static $table_name = 'GroupedProduct';

    /**
     * Human-readable singular name.
     * @var string
     * @config
     */
    private static $singular_name = 'Grouped Product';

    /**
     * Human-readable plural name
     * @var string
     * @config
     */
    private static $plural_name = 'Grouped Products';
    
    /**
     * Description for this object that will get loaded by the website
     * when it comes to creating it for the first time.
     *
     * @var string
     * @config
     */
    private static $description = "'Child' of a product grouping";

    private static $db = [
        self::GROUP_SORT_FIELD => 'Int'
    ];

    private static $has_one = [
        'ProductGroup' => ProductGroup::class 
    ];

    /**
     * Overwrite default relative link to link to the parent
     *
     * @param string $action See {@link Link()}
     *
     * @return string
     */
    public function RelativeLink($action = null)
    {
        $link = $this->ProductGroup()->RelativeLink($action);
        $link .= '?' . ProductGroupController::PRODUCT_QUERY_STRING .'=' . $this->URLSegment;
        $this->extend('updateGroupedProductRelativeLink', $link, $action);

        return $link;
    }

    /**
     * Simplify product fields
     *
     * @return \SilverStripe\Forms\FieldList
     */
    public function getCMSFields()
    {
        $self = $this;

        $this->beforeUpdateCMSFields(
            function ($fields) use ($self) {
                $fields->removeByName(
                    [
                        'URLSegment',
                        'Content',
                        'SortOrder',
                        'SummaryFields',
                        'Categories',
                        'Tags',
                        'Related'
                    ]
                );
            }
        );

        return parent::getCMSFields();
    }
}

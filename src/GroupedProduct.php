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
     * If price is not set, try to get price of parent
     *
     * @return float
     */
    public function getBasePrice()
    {
        if ($this->dbObject('BasePrice')->getValue() > 0) {
           return parent::getBasePrice();
        }

        return $this->ProductGroup()->getBasePrice();
    }

    /**
     * If price is not set, try to get price of parent
     *
     * @return float
     */
    public function getNoTaxPrice()
    {
        if ($this->dbObject('BasePrice')->getValue() > 0) {
           return parent::getNoTaxPrice();
        }

        return $this->ProductGroup()->getNoTaxPrice();
    }

    /**
     * If price is not set, try to get tax of parent
     *
     * @return float
     */
    public function getTaxAmount()
    {
        if ($this->dbObject('BasePrice')->getValue() > 0) {
            return parent::getTaxAmount();
        }

        return $this->ProductGroup()->getTaxAmount();
    }

    /**
     * If price is not set, try to get tax string of parent
     *
     * @return string
     */
    public function getTaxString($include_tax = null)
    {
        if ($this->dbObject('BasePrice')->getValue() > 0) {
            return parent::getTaxString($include_tax);
        }

        return $this->ProductGroup()->getTaxString($include_tax);
    }

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
     * If no images set on grouped product, try to get from group
     *
     * @return \SilverStripe\ORM\SS_List
     */
    public function SortedImages()
    {
        if (!$this->Images()->exists() && $this->ProductGroup()->Images()->exists()) {
            return $this->ProductGroup()->SortedImages();
        }

        return parent::SortedImages();
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

                /**
                 * @var \SilverStripe\Forms\CompositeField
                 */
                $price_fields = $fields->fieldByName('Root.Main.PriceFields');

                if (!empty($price_fields)) {
                    $price_fields->setDescription(
                        _t(
                            __CLASS__ . ".PriceDescription",
                            "Leaving blank will inherit price from group"
                        )
                    );
                }
            }
        );

        return parent::getCMSFields();
    }
}

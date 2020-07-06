<?php

namespace SilverCommerce\GroupedProducts;

use SilverStripe\View\ArrayData;
use SilverStripe\Control\Controller;
use SilverStripe\Core\Manifest\ModuleLoader;
use SilverStripe\Forms\OptionsetField;

/**
 * Custom version of the optionset field designed track more information against each option
 * (so you can gain product info via JS)
 */
class ProductGroupOptionsetField extends OptionsetField
{
    private $price_classname = "catalogue-product-price";

    private static $url_handlers = [
        '$Action/$ProductID' => '$Action'
    ];

    private static $allowed_actions = [
        'pricehtml'
    ];

    /**
     * Build a field option for template rendering
     *
     * @param mixed $value Value of the option
     * @param string $title Title of the option
     * @param boolean $odd True if this should be striped odd. Otherwise it should be striped even
     *
     * @return ArrayData Field option
     */
    protected function getFieldOption($value, $title, $odd)
    {
        return ArrayData::create(
            [
                'ID' => $this->getOptionID($value),
                'Class' => $this->getOptionClass($value, $odd),
                'Name' => $this->getOptionName(),
                'Value' => $value,
                'Title' => $title,
                'PriceClassName' => $this->getPriceClassName(),
                'URL' => Controller::join_links($this->Link('pricehtml'), $value),
                'isChecked' => $this->isSelectedValue($value, $this->Value()),
                'isDisabled' => $this->isDisabledValue($value)
            ]
        );
    }

    /**
     * Overwrite disabled value to check stock levels (if installed)
     *
     * @param string $value
     * @return bool
     */
    protected function isDisabledValue($value)
    {
        /** @var \Product */
        $product = GroupedProduct::get()->byID($value);
        $manifest = ModuleLoader::inst()->getManifest();

        if (empty($product)) {
            return true;
        }

        // If stock module not installed, we can revert to default
        if (!$manifest->moduleExists('silvercommerce/stock')) {
            return parent::isDisabledValue($value);
        }

        // If product is stocked, not out of stock, or allowing overwrites, return default
        if (!$product->Stocked || ($product->Stocked && ($product->AvailableOutOfStock || !$product->isStockOut()))) {
            return parent::isDisabledValue($value);
        }

        // Finally, disable this product
        return true;
    }

    /**
     * Action that gets the nice price of a product (via an AJAX call)
     *
     * @return string
     */
    public function pricehtml()
    {
        $request = $this->getRequest();
        $id = $request->param('ProductID');

        if (empty($id)) {
            return $this->httpError(500);
        }

        /** @var \Product */
        $product = GroupedProduct::get()->byID($id);

        if (empty($product)) {
            return $this->httpError(404);
        }

        return $product->getNicePrice();
    }

    /**
     * Get the value of price_classname
     *
     * @return string
     */
    public function getPriceClassName()
    {
        return $this->price_classname;
    }

    /**
     * Set the value of price_classname
     *
     * @return self
     */
    public function setPriceClassName($classname)
    {
        $this->price_classname = $classname;
        return $this;
    }
}

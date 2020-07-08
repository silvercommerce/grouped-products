<?php

namespace SilverCommerce\GroupedProducts;

use ProductController;
use SilverCommerce\ShoppingCart\Forms\AddToCartForm;
use SilverStripe\Forms\DropdownField;
use SilverStripe\Forms\OptionsetField;

class ProductGroupController extends ProductController
{
    const PRODUCT_QUERY_STRING = 'p';

    private static $allowed_actions = [
        "AddToCartForm"
    ];

    public function AddToCartForm()
    {
        $form = AddToCartForm::create(
            $this->owner,
            "AddToCartForm"
        );
        $object = $this->dataRecord;

        $form
            ->setProductClass(GroupedProduct::class)
            ->setProductID($object->ID);
        
        $fields = $form->Fields();
        $fields->removeByName('ID');
        $fields->insertBefore(
            'Quantity',
            $product_field = ProductGroupOptionsetField::create(
                'ID',
                _t(__CLASS__ . '.SelectProductTitle', 'Select a product to purchase')
            )->setSource($object->getSortedProducts()->map())
            ->setForm($form)
        );

        /** @var \SilverStripe\Forms\RequiredFields */
        $validator = $form->getValidator();
        $validator->addRequiredField('ID');

        // If product has been selected via the URL, then automatically set
        $request = $this->getRequest();
        $product_url = $request->getVar(self::PRODUCT_QUERY_STRING);
        $product = null;

        if (!empty($product_url)) {
            $product = $this->Products()->find('URLSegment', $product_url);
        }

        if (!empty($product)) {
            $product_field->setValue($product->ID);
        }

        return $form;
    }
}
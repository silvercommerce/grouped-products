<?php

namespace SilverCommerce\GroupedProducts;

use SilverStripe\ORM\DataExtension;

class LineItemExtension extends DataExtension
{
    /**
     * Ensure we set the title of the item correctly
     * @todo ideally this could be handled via the factory, but not really sure how
     *
     * @return null
     */
    public function onBeforeWrite()
    {
        $product = $this->getOwner()->FindStockItem();

        if (!empty($product) && is_a($product, GroupedProduct::class)) {
            $this->getOwner()->Title = $product->ProductGroup()->Title . ' - ' . $product->Title;
        }
    }
}

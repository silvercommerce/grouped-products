# SilverCommerce Grouped Products

Allows grouping of multiple products under a single "Product Group" that
will render products as a custom list and use group price if no individual
price is available.

## Install

Instalation via composer:

    composer require silvercommerce/grouped-products

## Usage

Once installed, two new product types will be added to your SilverCommerce install:

* ProductGroup: A contain for other products. This product will be shown in the catalogue and products in it's group will be displaid as radio buttons.
* GroupedProduct: A product that can be added to the Product Group.

If you are using the default SilverCommerce theme (or an extension of it) then you when viewing a grouped product, the
Products price will be automatically updated via AJAX when you select the relevent product within the group.

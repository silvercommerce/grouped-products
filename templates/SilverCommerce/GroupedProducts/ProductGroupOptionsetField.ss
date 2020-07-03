<% require javascript('silvercommerce/grouped-products:client/dist/script.js') %>

<ul $AttributesHTML>
	<% loop $Options %>
		<li class="$Class">
			<input id="$ID" data-url="$URL" data-productpriceclassname="$PriceClassName" class="radio" name="$Name" type="radio" value="$Value"<% if $isChecked %> checked<% end_if %><% if $isDisabled %> disabled<% end_if %> <% if $Up.Required %>required<% end_if %> />
			<label for="$ID">$Title</label>
		</li>
	<% end_loop %>
</ul>

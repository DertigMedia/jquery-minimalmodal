#MiMo - Minimal Modal
MinimalModal is a small jQuery modal for responsive dialog windows. Please try a few modals on http://mimo.30.nl
***
# Basic use
##### 1. Include files.
Download MinimalModal and include the js and css in your page. Supports jQuery from version 1.7 and up.
```html
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
<script src="jquery.mimo.min.js"></script>
<link rel="stylesheet" href="mimo.min.css" />
```
##### 2. Set up your modal(s).
Select the anchor that will launch your modal. The href refers to the id of your modal. You can use multiple modals on your page using different id's.
```html
<a href="#my_modal" class="mimo_open">Launch my modal</a>
```
Define your modal. Your content can be placed inside the div.
```html
<div id="my_modal" class="mimo_modal">My modal content</div>
```
##### 3. Done!
Your modal should be up and running. The default values for the modal are 100 for the top offset, 520 for the width. For the background the default color is black and the opacity is 0.3. You can change these using the advanced options and write custom css if you would like.
***
#Advanced use
##### Modal top offset and width.
With the 'data-mimo' attribute you can set the modals offset from the top of the screen and the width of the modal. Top offset and width will be ignored if there is not enough space on the screen to render the modal(ie on smartphones).
```html
<div id="my_modal" data-mimo="top:80;width:640;" class="mimo_modal">My modal content</div>
```
##### Overlay color and opacity.
Overlay color and opacity can also be set using the 'data-mimo' attribute.
```html
<div id="my_modal" data-mimo="opacity:0.4;color:#333333;" class="mimo_modal">My modal content</div>
```
##### Close button.
A custom close button can be added by defining a class name for the close button in the 'data-mimo' attribute and an element with that class can be included in the modal. The default close button will not be rendered on the screen.
```html
<div id="my_modal" data-mimo="close: my_close_button;" class="mimo_modal">My modal content<button class="my_close_button">Close</button></div>
```
##### Global options.
If you would like to set all the options for multiple modals on a page at once(for example the modals top offset).
```javascript
<script>
  $('.mimo_open').minimodal({ top:80; });
</script>
```
##### Classic look.
By adding the class 'mimo_classic' to the modal you can use the classic modal like in the example above.
```html
<div id="my_modal" class="mimo_modal mimo_classic">My modal content</div>
```
##### Custom CSS.
Add your own CSS and style the modal as you please. In the custom example above we set the modals background to tranparent.
```html
<div id="my_modal" class="mimo_modal" style="background-color:transparent;">My modal content</div>
```


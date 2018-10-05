# prez-software
 TODO: Make system to easily manage multiple presentations
 Add Hash endocing and decoding for "sudo" key values
 TODO: Document Code

# Run on Dev Server
  `npm i`
  `nodemon app.js ` \
  Nodemon? - A life saving NPM module that is ran on a system level which automatically runs "node (file.js)" when files are modified. Download nodemon by running `npm i -g nodemon`

# Making a Presentation
 1. Copy an existing presentation folder
 2. Change the folder name (which should be located at public/slides) with the name day[num of day] ex(day2)
 
# Making a Slide 
Making a slide is pretty simple. Just add a HTML section. `<section> <!--slide content--> </section>` inside the span with the class of "prez-root". Also keep in mind that you will need to copy and pate the markup inside the prez root to the other pages (viewer & controller).

# Adding Text
You may add text however you desire, but for titles use the h1 tag, smooth CSS styles have been added to make it bold.
# Images
  ## Adding Images 
By default, mages are wrapped in a picture like border. Using the `img` or `picture` tags are recommended. 
  ## Adding/Changing Background Images 
  Each slide can have a background image. A simple way to set a color is via CSS's background or background-color properties. 
  But images are a great way to add some spice to spice it up. Add the `data-background=img.url` data attribute. \
  Great sources to get images: \
  https://www.pexels.com/ \
  https://pixabay.com/ \
  https://www.reshot.com/ \
  https://picjumbo.com/ \
  https://www.rawpixel.com/ \
  DON'T USE UNSPLASH! Unsplash is one of the best if not #1 for getting stunning free stock photos, but our school wifi traffic regulating service decided to bock the site.
# Adding Code
## Adding Code Examples
 It is recommended you use jsfiddle for code examples but if its super short, or something JS fiddle cannot handle you can use the preloaded code printing library. Syntax Highlighting does not work. You will also need to escape your code if its HTML or uses characters that might interfere with HTML (<,>).  Example: \
 						`<pre><code data-trim data-noescape>
							<!-- Code here Any Lang -->
									</code></pre>
								</li>`
## Adding Editable code
Adding editable code is the deal "maker", use [jsfiddle] (https://jsfiddle.net/) (codepen requires pro plan) and toggle the only tabs you need the students to edit (js,html,css). For node or server based examples use [codebox](http://codebox.io). 

# Generating PDFs to hand out as notes
add the ?print-pdf query string to the URL. //Still under the works 

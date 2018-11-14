Hi everyone,

#change slide
My name is Anthony. I'm a frontend developer at west elm. More importantly, I've started taking the MTA subway as my main transportation this year. 

#change slide
One of the things I like about the subway is seeing when my next train is going to come.

Unfortunately, not all subway stations have these signs. But did you know that the MTA provides an API that exposes this subway information?

#change slide
The MTA also has a mobile-friendly website that shows this information.

#change slide
In this talk, we're going to be going through my journey of auditing this website and rebuilding it. We'll see what can be improved. I usually use this website in crowded subway stations with 1 or 2 bars. Because of that, I want to focus on making the fastest website possible.

#change slide
We're going to be using 2 tools to perform our audit; webpagetest and lighthouse.

#change slide
Webpagetest runs a free website speed test from multiple locations around the globe using real browsers and at real consumer connection speeds. It provides rich diagnostic information including waterfall charts, video capture, content blocking, and more. An easy way to run a test is to go to webpagetest.org.

#change slide
Lighthouse is an open-source, automated tool for improving the quality of web pages. You can run it against any web page, and has audits for performance, accessibility, progressive web appiness, and more. An easy way to run a test is from your Chrome Devtools.

Remember when I said that the site was mobile friendly? That original gif was from the website running on my Desktop with good wifi.
Let's look at the experience in a spotty 3G connection. 

#change slide
This is a video capture from webpagetest. It's running on a cellphone with slow 3G connection.
It takes 20 seconds to finish loading. And we all know, ain't nobody got time for that.

#change slide
So let's start seeing what we can improve. One of the first things I notice is the title of the website. 
The title is something that is shown on your website's tab. Also, if I try to save this website to my homescreen, it uses the title as the title for it. 

#change slide
The title here is HTML text for an image. Unfortunately, we can't use images in the title tag. 

#change slide
To fix this, we'll use text inside the title tag. The image on the website was pointing to some stylized text that said "MTA Subway time", so we'll use that as our title tag. Now our tabs are going to look a lot cleaner.

#change slide
Let's look at the icon that's being used when saving the webpage to our homescreen. Notice how it uses a screenshot of the website as the icon. That's not very pretty. 

#change slide
To fix this, we need to specify "apple-touch-icon" link tags in our HTML file. Depending on the size of the iOS device, it will use a different sized icon. 
For Android devices, you would specify the images in a manifest.json file. I think...I've never actually used an Android device. 

So now the webpage tab is looking good, and we know how to create a nice icon for it.  Let's take a look at the speed.

#change slide
This waterfall view is from webpagetest. Notice how we have one request for a JavaScript file that takes 15 seconds. That's a long time.
It's a 560kb file, and it's 2mb uncompressed.

#change slide
If we open up the file, we'll notice one thing. It's not minified. An easy way of telling if a file is minified is by looking at the network tab in Chrome Devtools. Notice how the line numbers in the files are displayed. Also look at how there are comments left in the JavaScript file.

#change slide
This screenshot shows a minified file. Look at the line numbers and notice the dashes. The dashes mean that everything was all on one line, but that the Devtools prettified the lines for you by adding linebreaks. Minified files are stripped of most JavaScript comments, other than those concerning licensing information. Another hint that a JavaScript file is minified is the variable names. Most minification tools do some type of uglification and shorten variable names to single letters, like we see here.
What are the size savings from minification?

#change slide
When the files are uncompressed, minification makes the file go from 2mb to 517kb, a 75% decrease in size.

#change slide
After compression, minification makes the file go from 588kb to 160kb, a 70% decrease in size. That's a pretty big saving. In my project, I'm using Webpack 4. It does minification by default.

#change slide
And we get to remove a lot of dead useless bytes. For example, in this file we were looking at, this vendor code actually included its unit tests in its comments. This large JavaScript file had 130 unit tests living inside it that were getting shipped to the client.

#change slide
What is this large JavaScript file for anyways? It contains the Ionic framework. It's built on top of Angular, and allows developers to build amazing apps in one codebase, for platforms like iOS and Android, with the web.

In my use case though, I don't want to publish any apps to the App store. I just want a very fast website, without the hassles of downloading an app from the app store. Depending on your use case, you might not need it either. There have been big advances in Progressive Web Applications, that make websites feel like native app experiences. So building for the web might be good enough for you.

#change slide
So what library do we want to use? Well I definitely want something small and fast.

So this is the size of ionic. The library combines the ionic and angular library code. We saw that it is more than 150kb. We see other frameworks and libraries here, like angular and react.

#change slide
There's also preact and marko, which are advertised as being smaller and faster.
But I needed something even smaller and faster!

#change slide
Vanilla JavaScript

#change slide
No JSX needed. No webpack needed. It just works on every browser. Beautiful!

And this works for our use case. The MTA website has very little interactions. There isn't a lot of state in the app. And unless we get thousands of extra train stations, we won't be rendering a lot of DOM Nodes. When we render a view, we can just throw away the old view. No need for a virtual DOM; no need for diffing algorithms. Vanilla JS is good enough.

#change slide
Ionic also comes with a stylesheet. With a lot of unused style. Chrome Devtools has a coverage tab that shows you how much unused JavaScript and CSS there is. 85% of the ionic stylesheet is unused. There are different ways of fixing this. There are tools that examine your CSS and your HTML file, and removes the unused styles from your CSS file.
Or...

#change slide
We can use inline-css.

Now I hear some gasps. What about media queries? How are you going to handle animations? If we look at the website, you won't see a lot of complex animations. And I'm only planning on creating this website for a mobile phone, so I'm not worried about media queries.

Other than speed, another benefit of using inline-css is that we don't have to worry about CSS Specificity.

Again, just like when we were looking at JavaScript frameworks to use, look at all options and see what fits your project.

#change slide
The website needs a lot of images when it's rendering. There are 24 images, each weighing 1.5kb. 

#change slide
Except for the random Staten Island Railroad image, that weighs twice as much at 3kb. Staten Island always has to be that weird borough.

#change slide
This is the waterfall that shows the images being requested.
Browsers have a maximum number of connections they can have per domain. It's usually between 6-8 connections.

#change slide
We have 6 parallel requests going out. That's the maximum amount that we can have. So all other requests are blocked until a response comes back. Because of this, we have this staircase pattern shown on the right. 

#change slide
Some websites can get around this by having different servers pointing to the same assets.
For example, Expedia uses a.travel-assets, b.travel-assets, and c.travel-assets domains for their static assets. 
In this scenario, we have 12 requests for images.

#change slide
If we didn't have different domains, we see this staircase pattern.

#change slide
With different domains, we don't have the staircase pattern.
HTTP2 would also solve this problem. 

#change slide
If we look at the images, the subway station icons are pretty simple. It's a circle with text inside of it. SVG's might be a better alternative than png's. SVG's also scale nicely and would still look good on resolutions like this.

#change slide
So I opened Sketch and created these icons.

#change slide
And I exported them as SVG's, and the code looked like this.

#change slide
Let's zoom in on the SVG code for the 1 subway station. These SVG tags are very repetitive. But a good thing about that is that it compresses very well.

#change slide
The png's together weigh 44kb. The svg's are only 9kb.

#change slide
After compression, the png's drop 10% to 38kb. But the svg's reduce 90%, to 950 bytes.

But...

#change slide
MTA requires a license to use their logos and symbols. 

#change slide
So this is what our rebuilt site is going to look like. I prefer squares anyway.

#change slide
The MTA website doesn't use HTTPS. Because of that, it can't use Service Workers.

To fix this, I'm using firebase hosting to host my static files. This gives me HTTPS for free.

Unfortunately, all the backend API calls also aren't served over HTTPs. When we are on an HTTPs website making a request to an unsecure website, we get a warning that looks like this.

#change slide
This "Mixed Content" warning is our browser trying to keep us safe. To fix this, I'm using firebase functions. These cloud functions run backend code in response to triggers, such as HTTP requests. More importantly, it gives us HTTPS for free for my backend routes.

No more "Mixed Content" warnings.

#change slide
With HTTPs, we can use Service Workers to cache our static assets. This makes for a very fast repeat view.
The MTA website, which doesn't have a service worker, loads in 3 seconds.

#change slide
Our rebuilt website, which does use Service Worker, takes less than a second to load.

After all of our changes, let's take a look at our newly rebuilt website.

#change slide
This is our webpagetest results. It shows that the document is done in 3.2 seconds. We got A's on all its main metrics.

#change slide
This is our Lighthouse results. It shows 100 ratings for Performance, Progressive Web Appiness, Accessibility, Best Practices, and SEO. I could stare at this GIF all day.

#change slide
On slow 3g connection, this is what rendering looks like.

#change slide
And this is what it feels like to move around in the new website.

#change slide
In the future, I want to do some accessibility audits. Lighthouse does some accessibility tests with automated tools, but nothing beats going through your web experience and manually testing it.

Currently, the home page loads in 3 seconds. Can we improve it? I want to look at code splitting our different views. Also, the first page is dynamically rendered. Could we have it built server-side and sent to the client?

For those interested, file issues and create Pull Requests here.
https://github.com/newyork-anthonyng/faster-mta

#change slide
In conclusion, use tools like webpagetest, lighthouse and the code coverage tool.

You want to find the right tool for the job. If you have a website with a lot of state and interactions, use a library like React. But if vanilla JavaScript is good enough for you, then use that. If your app is just static content, use a templating language like handlebars.

Be critical of everything that goes into your application. In our audit, I looked at the waterfall and asked if anything could be removed. One of the quickest ways to make a website faster is to gut it out.

If anyone would like to talk, feel free to tap me on my shoulder. Thank you for listening.
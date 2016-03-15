![Perception of time;full-size](/content/images/2016/03/perception-of-speed-1.jpg)

# Perceived load time

To be able to create great load times for our websites we need to understand what load time is. In this article I will take a dive into the concept of time and how we as humans understand it. This will be used to give an understanding of how a websites load should be constructed.

## Measured time

Time is a complex subject and has been a major study in religion, philosophy, psychology and science. One definition of time is:

> The measured or measurable period during which an action, process, or condition exists or continues

So the measured time relates to some kind of action which has a **start marker** and an **end marker**. The difference between these two point are measured in seconds, minutes, hours etc.

![Timeline, Usain Bolt running;full-size;ratio=1280:596](/content/images/2016/03/usain-bolt.jpg)

<p class="img-caption">Mens 100 meter final, WC Berlin 2009</p>

In the offline world time could be the 9.58 seconds it took Usain Bolt to react to the starting gun (start marker) and reach the finish line (end marker) 100 meters away.

In the online world the time it takes a website to load has historically been measured with the load time, which is the time it takes from activating a website by clicking on a link or browsing (start marker) till the website has finished all requests (end marker).

Optimising this load time requires an understanding of the technologies involved on the Internet. When looking at improving load time, things like reducing the server response time, number of requests and the total payload is considered - all which are easily measured.

All [best practices](https://developers.google.com/speed/docs/insights/rules#speed-rules) in the strive for better load times have been tested and proven to reduce the time between the **start marker** and the **end marker**. Furthermore studies have shown that there is a direct correlation between load time and the user experience.

> Remember that time is money. **Benjamin Franklin**

A study states that after 3 seconds 40% of your users will abandon the website. Wallmart conducted a test which clearly showed that 1  second improvement in load time related to a increase in conversion with 2%. Another large study on mobile e-commerce sites showed that a 1 second improvement in load time improved page views with 9.4%, bounce rate with 8.5%, conversion rate with 3.5% and cart size with 2.1%.

Improving load time is a key improvement for user experience and is vital for e-commerce websites. For some time the load time benchmark on a cabled connection was set at 2 seconds, but recently Google have even suggested a [1 second benchmark](https://developers.google.com/speed/docs/insights/mobile#adapting-to-high-latency-mobile-networks) for mobile websites.

Looking at some real numbers from the wild on a 5/1 Mbps connection shows that a 1 second load time budget is ambitious:

- google.com: **2.0s**
- github.com: **3.6s**
- ebay.com: **7.1s**
- amazon.com: **8.5s**

These numbers indicate that Amazon has a really slow website - in fact it is only barely faster that Usain Bolt running 100 meters. But wait, why is *the* biggest e-commerce website that slow? Clearly they must be aware that "time is money".

In fact they do, but they have understood that load time is not just a matter of time between the start and end marker, which we defined earlier as the load time. In fact Amazon are very close to the 1 second performance budget, but we will get back to this after we've taken a dive into how we as humans perceive time - and especially waiting time.

## Perceived time

Performance is not about milliseconds, kilobytes and number of requests. In fact *no* user cares about these numbers (except me and a couple of other performance nerds). Performance is all about perception and the way the user experiences the load.

### The web is visually experienced

Most performance metrics are based on measured time, number of requests and kilobytes. But humans experience the web mostly through the eyes. Thus the customer do not care when all requests from the server has ended. What they experience is visual changes and for the user the website is experienced as fully loaded, when no more visual changes happen. In fact the websites is often perceived as ready, as soon as the information the user seeks is visible.

To have a better understanding of how our users perceive the load time, we have to look at the visual loading progression - not the scientific numbers.

![Waiting is boring;full-size](/content/images/2016/03/waiting.jpg)

### Waiting time

When speaking of the load time, it is a waiting time. The user has made an action, because she wants some information and are just waiting for the reaction. This is like taking an elevator: You have decided to go to another floor and are just standing in the elevator waiting for it to get there.

In fact waiting in the real world relates to waiting for a website to load, and we can learn a lot from the physical world.

Boston Airport experienced problems with waiting time at first hand. They received many complaints from their passangers, because they were frustrated about the waiting time for their luggage. The management in the airport decided to do something about this wait time. They improved the technology, the infrastructure and hired more people. They significantly reduced the time it took from an airplane had landed till the luggage was ready to be picked up by the customers. They even became one of the fastest in the United States. Happy about their improvements the management was surprised that they still received many complaints.

![Boston graphics, 1:7;ratio=756:400](/content/images/2016/03/boston-long-passive-wait-1.jpg)

They did some analysis on the wait time, which showed that on average it took the luggage 8 minutes to arrive. It took the passanger 1 minute to walk to the luggage pick-up, which left them 7 minutes of wait. Knowing that they could not improve the time between the **start marker** and the **end marker**, they took a different approach. They decided to use a luggage pick-up further away from the airplane. It actually increased the *measured time* to 9 minutes, but now it took the passengers 7 minutes of walk, which only left 2 minutes of wait. Even though the total wait time had increased they no longer received a single complaint.

![Boston graphics, 7:2;ratio=756:400](/content/images/2016/03/boston-short-passive-wait-1.jpg)

Why did this work? Waiting time can be split into a passive and active waiting time. In passive waiting time you do not have any control of time. In active time you are doing something physical or mental.

The active phase tends to be perceived shorter because you occupy your brain. Studies suggest that on average people estimate passive waiting time to be 36% longer that active. Actually the wait time we refer to as humans often only relates to the passive wait, whereas the active wait seldom is even considered a wait.

## Measuring the perceived load time on websites

By now we know that the load time on the Internet is perceived visually and that active wait is experienced shorter. Based on this knowledge we can revisit the load time of Amazon, which actually has a fast website, when we look at perceived load time.

![Amazon load filmstrip;ratio=756:706](/content/images/2016/03/amazon-filmstrip-1.png)

<p class="img-caption"><a href="http://www.webpagetest.org/video/compare.php?tests=160308_MD_4c7311dd535bf1779593cb68a8d48fe8-r%3A8-c%3A0&thumbSize=200&ival=100&end=visual">WebPagetest</a> on a Amazon product page</p>

The measured load time for this webpage is **8.5 seconds**, but as the visual progression shows, the website is visually complete within **1.6 seconds**. If we look closer at the visual progression, the information which the user is most likely looking for, is actually visually ready already after **1.2 seconds**. The huge difference between load time and visual ready has to do with the way Amazon prioritises the content on their website. They know that the visual progression is what the customer experiences. They have structured their website to ship the visual content as fast a possible. After the visual content has been shipped, they will start loading everything else in the background like tracking scripts, interaction with javascript, images further down the page etc.

Furthermore they know, that the active wait time will be perceived as shorter than the passive. They deliberately ship the first visual change as fast as possible, which is within **0.9 seconds**. As soon as there are some visuals on the screen, the human brain begins to process it and thus kicks into the active wait phase.

Ét voila, what previously looked like a darn slow website, with a load time of 8.5 seconds, now is reduced to a mere 0.9 seconds of perceived waiting time.

### Not optimised for the perceived load time

Let us look at another example of an e-commerce website, with a measured load time of **7.4 seconds**, which is faster than Amazon:

![borders;ratio=758:921](/content/images/2016/03/foetex-filmstrip.png)

<p class="img-caption">Some frames have been removed to make the image smaller. See the full <a href="/content/images/2016/03/filmstrip.png">timeline</a></p>

If we look at the numbers from WebPagetest the first visual change happens at **1.9** seconds. You have to look very close to actually see the visual change: The default white background is changed with a light grey background :-). Though it is a visual change there is really nothing for the user to process and it will still be a passive wait.

At **3.2 seconds** the first actual visual change is happening, but again this change doesn't add any value for the user. There is nothing to read and no image to look at - even the logo is not visible. Remember that approximately 40% of the users have abandoned a website after 3 seconds of wait time.

At **3.9 seconds** the first usable visual change is happening and the passive wait is over. We even get a big fancy woody background image. But it is not until **6.2 seconds** we get the image of the actual product we have searched for.

## Performance is a feature

For the above example the perceived load time isn't really that great, but you know what, it is fixable.

Performance is not a technical problem though. We know how to make websites fast. Or rather we know what makes websites slow, as by default the web is fast.

We are in a position where we know what to do to make nearly any website really damn fast. People have worked tirelessly to solve the problems of web performance and there are many good guides and tools to improve both measured and perceived load time.

But websites are still slow. Why?

The problem is that performance is a feature which is commonly overlooked. As described earlier load times correlates directly to typical e-commerce KPIs as conversion rate, basket size and page views.

Performance isn’t a technical dept, but an opportunity to grow your audience, to grow your business or to convert more sales. Performance is an opportunity, and a risk, the same way that a redesigned template is, a new logo or a change to the navigation.

Perceived load time is a feature which needs attention. Nursed well and it will benefit your customers and your business.

<p class="img-caption" style="margin-top: 2em">Credits:<br>This is heavily inspired by the great 3 part write up on <a href="https://www.smashingmagazine.com/2015/09/why-performance-matters-the-perception-of-time/">Why performance matters</a> by Denys Mishunov. Peter Chamberlin thoughts around <a href="https://peterchamberlin.com/fast.php">Performance is a feature</a> have also almost been copied.</p>

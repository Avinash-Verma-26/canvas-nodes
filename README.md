# Creating a XFigura / FloraFauna / Krea clone

The Idea to tackle this generated from frustrations while using Xfigura UI.
I wanted to see how difficult is it to make something similar and make it work fluidly.

## Challenges faced so far

1. The first challenge was figuring out that the Canvas layer and the Node layer act as two separate layers - like tracing paper
2. Also need to hide the overflow on the node layer to simulate masking - where the elements outside the canvas window don't show. Only stuff within canvas is visible.
3. Node movement and zooming - This is the big one. The trick to make the canvas feel infinite. For this I have a whole section later

## Infinite canvas

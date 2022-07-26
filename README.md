#flairtask

Local run: npm start

# Write an App that takes score of a bowling game

Thanks for your interest in joining our team!

We are very practical at flair and this extends to the way that we work with you to find out if this team is a great fit for you. We want you to come away with a great understanding of the work that we actually do day-to-day and what it is like to work with us.

So instead of coding at a whiteboard with someone watching over your shoulder under high pressure, which is not a thing we often do, we instead discuss code that you have written previously when we meet.

## Main Requirements

The App should be written using [React](https://reactjs.org/) and [TypeScript](https://www.typescriptlang.org/). In addition, it should provide the following:

- A way to start a new bowling game;
- A way to input the number of pins knocked down by each ball;
- A way to output the current game score (score for each frame and total score).
- (Bonus!) Have some tests

## Logic details

- Bowling is played by throwing a ball down a narrow alley toward ten wooden pins. The objective is to knock down as many pins as possible per throw.
- The game is played in ten frames. At the beginning of each frame, all ten pins are set up. The player then gets two tries to knock them all down.
- If the player knocks all the pins down on the first try, it is called a "strike,“ and the frame ends.
- If the player fails to knock down all the pins with his first ball, but succeeds with the second ball, it is called a "spare“.
- After the second ball of the frame, the frame ends even if there are still pins standing.
- A strike frame is scored by adding ten, plus the number of pins knocked down by the next two balls, to the score of the previous frame.
- A spare frame is scored by adding ten, plus the number of pins knocked down by the next ball, to the score of the previous frame.
- Otherwise, a frame is scored by adding the number of pins knocked down by the two balls in the frame to the score of the previous frame.
- If a strike is thrown in the tenth frame, then the player may throw two more balls to complete the score of the strike.
- Likewise, if a spare is thrown in the tenth frame, the player may throw one more ball to complete the score of the spare.
- Thus the tenth frame may have three balls instead of two.

For background information, please see [http://en.wikipedia.org/wiki/Ten-pin_bowling](http://en.wikipedia.org/wiki/Ten-pin_bowling)

## Going Above and Beyond the Requirements

Given the time expectations of this exercise, we don't expect anyone to submit anything super fancy, but if you find yourself with extra time, any extra credit item(s) that showcase your unique strengths would be awesome! 🙌

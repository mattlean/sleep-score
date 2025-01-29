# Sleep Score

This is a fun little personal sleep score project made to help improve my sleep.

I've always had a really hard time getting to sleep and staying asleep due to health reasons, so I require a lot more effort in getting a good night's rest when compared to normal people.

This algorithm uses data collected by a sleep tracking device to calculate sleep scores based on user set goals. This calculation can be run for a particular day, week, month, etc. It is generic, so it isn't tied to any particular brand of device, but I use a Fitbit brand device at the moment.

Fitbit already has a sleep score feature that works well for most people, but I find it a bit too generous for my scenario, although that makes sense since it needs to work for extremely large demographic.

Unfortunately I don't have what is considered to be a normal sleep pattern, so I need a sleep score that follows a stricter ruleset but can also be adjusted. This score may potentially stress out some people, but I am usually not negatively stressed by bad health metrics, and I personally feel more motivated to improve when I understand them.

# Calculation

## Parameters

### Define the Goals

The goals act as the initial parameters for the calculation.

#### Bedtime Goal

Set the earliest possible bedtime that would be considered excellent for your goals. This time is referred to as the **bedtime goal**.

The algorithm will use this bedtime goal to generate ranges of time that will be used to grade the bedtimes we have. The closer the bedtime is to the bedtime goal, the better grade we will get.

We will use 9:00 PM as the bedtime goal for our example scenario.

#### Time Asleep Goals

Set the minimum duration goals for the excellent, fair, and poor time asleep.

A time asleep meeting or exceeding the excellent minimum duration goal would be considered an excellent time asleep.

A time asleep meeting or exceeding the fair minimum duration goal, but still under the excellent minimum duration goal would be considered a fair time asleep.

A time asleep meeting or exceeding the poor minimum duration goal, but still under the fair minimum duration goal would be considered a poor time asleep.

We will use the following as our time asleep goals for our example:

| Grade     | Example | Window of Duration |
| --------- | ------- | ------------------ |
| Excellent | 9 hours | > 9:00             |
| Fair      | 7 hours | 7:00 – 8:59        |
| Poor      | 3 hours | 3:00 – 6:59        |

Note that we reasoned to use 3 hours as the minimum duration goal for the poor grade because Fitbit does not track sleep stages when the time asleep is under 3 hours for a session.

#### Deep Sleep Percentage Goal

Set the minimum percentage of deep sleep for each session that would be considered excellent for your goals.

We'll use 15% for this example.

#### REM Sleep Percentage Goal

Set the minimum percentage of REM sleep for each session that would be considered excellent for your goals.

We'll use 20% for this example.

### Sleep Metrics

Now that we have our goals defined, all we need to do is sleep and gather metrics for a session.

These are the actual measurements taken from a particular sleep session that will be evaluated against your goals:

- **Bedtime**: When you feel asleep
- **Time asleep**: How long you stayed asleep
- **Deep sleep**: How long you stayed in deep sleep
- **REM sleep**: How long you stayed in REM sleep

## Formula

Now that we have both our goals set and our sleep metrics gathered, we can start the calculation for a score by using this formula:

$$\left\lceil S \right\rceil = (T \times 0.6 + D \times 0.4) \times 0.8 + Q \times 0.2$$

## Grading $T$ (Bedtime Grade)

$T$ represents the **bedtime grade** which uses the bedtime metric from the given sleep session and evaluates it against grading ranges generated from your bedtime goal.

Continuing the example we've been working with, let's see what the grading ranges are when the bedtime goal is 9:00 PM and actually grade a 9:30 PM bedtime metric against it:

| Grade     | Window of Time (Offset From Bedtime Goal)    | 9:00 PM Bedtime Goal Example | Points |
| --------- | -------------------------------------------- | ---------------------------- | ------ |
| Fair      | -0.5 to 0 hours                              | 8:30 PM – 8:59 PM            | +90    |
| Excellent | +0 to 2.75 hours                             | 9:00 PM – 11:45 PM           | +100   |
| Fair      | +2.75 to 3.5 hours                           | 11:46 PM – 12:30 AM          | +90    |
| Bad       | Any time outside of excellent & fair windows | 12:31 AM – 8:29 PM           | +50    |
| Fail      | No bedtime                                   | N/A                          | +0     |

_The maximum amount of possible points earned is 100._

9:30 PM is considered an excellent bedtime, resulting to $T = 100$.

## Grading $D$ (Time Asleep Grade)

$D$ represents the **time asleep grade** which uses the time asleep metric from the given sleep session and evaluates it against your time asleep goals.

Let's say our time asleep metric is 7 hours and grade it against our time asleep goals:

| Grade     | Goal Example | Window of Duration | Points |
| --------- | ------------ | ------------------ | ------ |
| Excellent | 9 hours      | >= 9:00            | +100   |
| Fair      | 7 hours      | 7:00 – 8:59        | +70    |
| Poor      | 3 hours      | 3:00 – 6:59        | +60    |
| Bad       | <3 hours     | 0:01 – 2:59        | +50    |
| Fail      | N/A          | No time asleep     | +0     |

_The maximum amount of possible points earned is 100._

7 hours is considered a fair time asleep, resulting to $D = 70$.

## Grading $Q$ (Quality of Sleep Grade)

$Q$ represents the **quality of sleep grade** which uses the deep and REM sleep metrics from the given sleep session and evaluates it against grading ranges generated from your deep and REM sleep percentage goals.

Before we can calculate $Q$, we need to grade deep and REM sleep as $d$ and $r$ respectively.

### Grading $d$ (Deep Sleep Grade)

When the deep sleep goal percentage is 15%, 15% of the minimum duration for the excellent time asleep determines the minimum duration excellent deep sleep. The same methodology is used with the fair time asleep duration to determine the minimum duration for fair deep sleep.

Let's say our deep sleep metric is 1 hour and grade it against these grading ranges:

| Grade     | Window Duration | Points |
| --------- | --------------- | ------ |
| Excellent | >= 1:21         | +50    |
| Fair      | 1:03 – 1:20     | +40    |
| Bad       | 0:01 – 1:02     | +10    |
| Fail      | No deep sleep   | +0     |

_The maximum amount of possible points earned is 50._

1 hour is considered bad sleep, so $d = 10$.

### Grading $r$ (REM Sleep Grade)

When the REM sleep goal percentage is 20%, 20% of the minimum duration for the excellent time asleep determines the minimum duration excellent REM sleep. The same methodology is used with the fair time asleep duration to determine the minimum duration for fair REM sleep.

Let's say our REM sleep metric is 1.5 houra and grade it against these grading ranges:

| Grade     | Window Duration | Points |
| --------- | --------------- | ------ |
| Excellent | >= 1:48         | +50    |
| Fair      | 1:24 – 1:47     | +40    |
| Bad       | 0:01 – 1:23     | +10    |
| Fail      | No REM sleep    | +0     |

_The maximum amount of possible points earned is 50._

1.5 hours is considered fair sleep, so $r = 40$.

### Calculating $Q$

Now that we have $d$ and $r$, all we need to do is sum them together to get $Q$.

$$Q = d + r$$

For our example, that means that $Q = 50$.

When used with Fitbit, if there is no data available for deep and REM sleep, we will assume that the tracker did not track sleep stage data because the time asleep was under 3 hours resulting to $Q = 0$.

## Calculating $S$ (Sleep Score)

Now that we have calculated all of the necessary grades, we simply plug them into the formula and put the output score against the following grading scale:

| Grade     | Score Range |
| --------- | ----------- |
| Excellent | 100         |
| Good      | 90 – 99     |
| Fair      | 80 – 89     |
| Poor      | 70 – 79     |
| Bad       | 1 – 69      |
| Fail      | 0           |

To finish off our example, here is what the formula looks like:

$$\left\lceil 80.4 \right\rceil = (100 \times 0.6 + 70 \times 0.4) \times 0.8 + 50 \times 0.2$$

After taking the ceiling of $Q$, we get a sleep score of $81$ which is considered a fair sleep score.

## Potential Improvements

- Factor in sleep debt like [Whoop](https://support.whoop.com/s/article/WHOOP-Sleep).
- Punish an excessive amount of days with oversleep (10+ hours).
- Factor in sleep efficiency: time asleep percentage of total time in bed, and number of sleep sessions.
- Factor in heart rate like [Fitbit's restoration metric](https://support.google.com/fitbit/answer/14236513?hl=en#zippy=%2Chow-is-my-sleep-score-calculated-in-the-fitbit-app) under quality of sleep.
- Incorporate elements commonly used in readiness and recovery scores like HRV.

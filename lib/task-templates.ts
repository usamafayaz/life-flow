import type { TaskTemplate } from '@/store/task-store'

export const TASK_TEMPLATES: TaskTemplate[] = [
  {
    id: 'morning-routine',
    title: 'Morning Routine',
    simpleTitle: 'Morning Routine',
    description:
      'Start your day right with a structured morning routine that sets a positive tone. Each step builds momentum for a productive day ahead.',
    simpleDescription: 'Do your morning steps one at a time.',
    category: 'Daily Living',
    estimatedMinutes: 30,
    steps: [
      {
        id: 'mr-1',
        title: 'Wake up and get out of bed',
        simpleTitle: 'Get out of bed',
        instruction:
          'When your alarm goes off, sit up slowly and give yourself a moment to become fully awake before standing. Avoid checking your phone immediately.',
        simpleInstruction: 'Sit up slowly. Do not check your phone yet.',
        tip: 'Keep your curtains open the night before so natural light helps you wake up.',
      },
      {
        id: 'mr-2',
        title: 'Drink a glass of water',
        simpleTitle: 'Drink water',
        instruction:
          'Drink at least one full glass of water (about 250ml) to rehydrate your body after sleep. Room temperature or warm water is easier on your stomach.',
        simpleInstruction: 'Drink one glass of water. Room temperature is fine.',
        tip: 'Keep a glass of water on your bedside table the night before.',
      },
      {
        id: 'mr-3',
        title: 'Brush your teeth',
        simpleTitle: 'Brush teeth',
        instruction:
          'Brush all surfaces of your teeth for a full two minutes. Use a soft-bristled toothbrush and fluoride toothpaste. Rinse thoroughly afterward.',
        simpleInstruction: 'Brush your teeth for 2 minutes.',
        tip: 'Use a timer or play a 2-minute song to keep track.',
      },
      {
        id: 'mr-4',
        title: 'Eat breakfast',
        simpleTitle: 'Eat breakfast',
        instruction:
          'Have a balanced breakfast with some protein, healthy carbohydrates, and a piece of fruit if possible. Take your time and sit down to eat without rushing.',
        simpleInstruction: 'Eat something for breakfast. Sit down while you eat.',
      },
      {
        id: 'mr-5',
        title: 'Get dressed',
        simpleTitle: 'Get dressed',
        instruction:
          'Choose your outfit for the day. Lay everything out before putting it on to make the process easier. Check the weather if you need to decide on layers.',
        simpleInstruction: 'Put on your clothes for the day.',
        tip: 'Lay out your clothes the night before to save time and mental energy.',
      },
      {
        id: 'mr-6',
        title: 'Plan your day',
        simpleTitle: 'Plan your day',
        instruction:
          'Take 3-5 minutes to think about or write down the most important things you need to do today. Focus on no more than three key priorities to keep it manageable.',
        simpleInstruction: 'Think of 3 things to do today. Write them down.',
      },
    ],
  },
  {
    id: 'cooking-pasta',
    title: 'Cooking Pasta',
    simpleTitle: 'Cook Pasta',
    description:
      'A step-by-step guide to cooking a simple, satisfying pasta dish. Follow each step carefully and you will have a great meal ready in about 20 minutes.',
    simpleDescription: 'Cook pasta step by step.',
    category: 'Cooking',
    estimatedMinutes: 20,
    steps: [
      {
        id: 'cp-1',
        title: 'Fill a large pot with water',
        simpleTitle: 'Add water to pot',
        instruction:
          'Fill a large pot with approximately 4 litres of cold water. Using a large pot prevents the pasta from sticking together and ensures even cooking.',
        simpleInstruction: 'Put 4 litres of cold water in a big pot.',
        tip: 'The pot should be about two-thirds full. Room is needed for the pasta.',
      },
      {
        id: 'cp-2',
        title: 'Bring the water to a rolling boil',
        simpleTitle: 'Boil the water',
        instruction:
          'Place the pot on the stove over high heat. Wait until the water is at a full, rolling boil. You will see large bubbles breaking the surface continuously. This takes 8-12 minutes.',
        simpleInstruction: 'Turn on the stove to high heat. Wait for big bubbles.',
      },
      {
        id: 'cp-3',
        title: 'Salt the water and add pasta',
        simpleTitle: 'Add salt and pasta',
        instruction:
          'Add 1-2 tablespoons of salt to the boiling water. It should taste pleasantly salty, like the sea. Then add your pasta all at once and stir immediately.',
        simpleInstruction: 'Add 1-2 tablespoons of salt. Add pasta. Stir right away.',
        tip: 'Salting the water is the only chance to season the pasta itself, not just the sauce.',
      },
      {
        id: 'cp-4',
        title: 'Cook according to package directions',
        simpleTitle: 'Cook the pasta',
        instruction:
          'Check the pasta packaging for the cooking time. Stir occasionally to prevent sticking. Taste a piece 1 minute before the suggested time. The pasta should be tender but with a slight resistance (al dente).',
        simpleInstruction: 'Cook for the time on the package. Stir sometimes. Taste to check.',
        tip: 'Set a timer so you do not forget.',
      },
      {
        id: 'cp-5',
        title: 'Drain the pasta',
        simpleTitle: 'Drain the pasta',
        instruction:
          'Place a colander in the sink. Carefully pour the pasta and water into the colander. Shake gently to remove excess water. Do not rinse the pasta, as the starch helps sauce stick.',
        simpleInstruction: 'Pour pasta into a strainer. Do not rinse it.',
        tip: 'Save a cup of pasta water before draining. It can help thin your sauce.',
      },
      {
        id: 'cp-6',
        title: 'Add sauce and serve',
        simpleTitle: 'Add sauce and eat',
        instruction:
          'Return the drained pasta to the pot or a serving bowl. Add your sauce of choice and toss well to coat every strand. Serve immediately while hot.',
        simpleInstruction: 'Mix pasta with your sauce. Serve right away.',
      },
    ],
  },
  {
    id: 'doing-laundry',
    title: 'Doing Laundry',
    simpleTitle: 'Do Laundry',
    description:
      'Keep your clothes clean and fresh with this clear guide to doing laundry from start to finish. Covers sorting, washing, and transferring to the dryer.',
    simpleDescription: 'Wash your clothes step by step.',
    category: 'Household',
    estimatedMinutes: 75,
    steps: [
      {
        id: 'dl-1',
        title: 'Sort your laundry',
        simpleTitle: 'Sort clothes',
        instruction:
          'Separate clothes into groups: whites and light colours, darks and blacks, and delicates or items requiring special care. Check garment labels for any "hand wash only" or "dry clean only" instructions.',
        simpleInstruction: 'Sort into: whites, darks, and delicates. Check labels.',
        tip: 'Check pockets before sorting. Tissues or coins can damage your washing machine.',
      },
      {
        id: 'dl-2',
        title: 'Load the washing machine',
        simpleTitle: 'Load the machine',
        instruction:
          'Place one sorted pile into the washing machine drum. Do not overload it. Clothes need room to move freely, and a full drum should have a fist-sized gap at the top.',
        simpleInstruction: 'Put one pile of clothes in the machine. Leave some space.',
      },
      {
        id: 'dl-3',
        title: 'Add detergent',
        simpleTitle: 'Add detergent',
        instruction:
          'Add the recommended amount of detergent to the dispenser drawer (or drum if using pods). Use the measuring lines on the cap or the guidelines in the dispenser. Too much detergent can leave residue.',
        simpleInstruction: 'Add the right amount of detergent. Follow the instructions on the bottle.',
        tip: 'Pods go directly into the drum before clothes. Liquid/powder goes in the drawer.',
      },
      {
        id: 'dl-4',
        title: 'Select the right wash settings',
        simpleTitle: 'Set the wash cycle',
        instruction:
          'Choose a cycle based on your laundry type: Normal/Cotton for everyday items, Delicate for fragile pieces, Quick wash for lightly soiled clothes. Use cold water for colours and delicates, warm for whites.',
        simpleInstruction: 'Pick the right cycle. Use cold water for colours.',
      },
      {
        id: 'dl-5',
        title: 'Start the machine',
        simpleTitle: 'Start the wash',
        instruction:
          'Press the Start button. The machine will begin filling with water. You can leave it running. Check back when the cycle is complete, usually in 30-60 minutes.',
        simpleInstruction: 'Press Start. Come back when it is done.',
      },
      {
        id: 'dl-6',
        title: 'Transfer clothes to the dryer',
        simpleTitle: 'Move clothes to dryer',
        instruction:
          'Remove clothes from the washing machine promptly to prevent mildew. Shake each item out before placing in the dryer. Check labels, as some items must be air-dried flat. Clean the dryer lint trap before starting.',
        simpleInstruction: 'Move clothes to dryer. Check labels first. Clean the lint trap.',
        tip: 'Leaving wet laundry sitting for too long causes musty smells.',
      },
    ],
  },
  {
    id: 'preparing-for-bed',
    title: 'Preparing for Bed',
    simpleTitle: 'Get Ready for Bed',
    description:
      'Wind down and prepare your mind and body for restful sleep. This routine helps signal to your brain that it is time to relax.',
    simpleDescription: 'Do your bedtime steps to sleep well.',
    category: 'Daily Living',
    estimatedMinutes: 20,
    steps: [
      {
        id: 'pb-1',
        title: 'Dim the lights in your space',
        simpleTitle: 'Dim the lights',
        instruction:
          'Lower the brightness in your bedroom and any rooms you are using. Bright overhead lights suppress melatonin production. Use a lamp or dim setting instead. Reduce screen brightness too.',
        simpleInstruction: 'Turn the lights down low. Lower your screen brightness.',
        tip: 'Blue light from screens affects sleep quality. Try switching to night mode.',
      },
      {
        id: 'pb-2',
        title: 'Brush your teeth and wash your face',
        simpleTitle: 'Brush teeth, wash face',
        instruction:
          'Brush your teeth for two minutes and floss if you can. Wash your face to remove the day\'s dirt and oils. Pat dry gently with a clean towel.',
        simpleInstruction: 'Brush teeth for 2 minutes. Wash your face.',
      },
      {
        id: 'pb-3',
        title: 'Set your alarm for tomorrow',
        simpleTitle: 'Set your alarm',
        instruction:
          'Set your alarm for the time you need to wake up tomorrow. Double-check the AM/PM setting. If you have appointments, check them now so nothing surprises you in the morning.',
        simpleInstruction: 'Set your alarm for tomorrow. Check the time is correct.',
        tip: 'Once set, put your phone face-down or in another room to avoid late-night scrolling.',
      },
      {
        id: 'pb-4',
        title: 'Place water by your bed',
        simpleTitle: 'Put water by your bed',
        instruction:
          'Keep a glass or bottle of water on your bedside table. You may wake up thirsty during the night, and having water close by means you will not need to get up fully.',
        simpleInstruction: 'Put a glass of water next to your bed.',
      },
      {
        id: 'pb-5',
        title: 'Practice slow breathing',
        simpleTitle: 'Breathe slowly',
        instruction:
          'Lie down and take 5 deep, slow breaths. Breathe in through your nose for 4 counts, hold for 2, and out through your mouth for 6 counts. This activates your body\'s relaxation response.',
        simpleInstruction: 'Breathe in for 4, hold for 2, out for 6. Do this 5 times.',
        tip: 'If thoughts are racing, try naming 5 things you can see, 4 you can hear, 3 you can touch.',
      },
    ],
  },
  {
    id: 'grocery-shopping',
    title: 'Grocery Shopping Trip',
    simpleTitle: 'Go Food Shopping',
    description:
      'Make your grocery trip efficient and stress-free with this step-by-step guide. Planning ahead saves time, money, and forgotten items.',
    simpleDescription: 'Get your food shopping done step by step.',
    category: 'Errands',
    estimatedMinutes: 45,
    steps: [
      {
        id: 'gs-1',
        title: 'Write your shopping list',
        simpleTitle: 'Write a list',
        instruction:
          'Go through your kitchen and note what you have run out of or are running low on. Think through meals for the coming week. Organise your list by store section (produce, dairy, etc.) to save time walking back and forth.',
        simpleInstruction: 'Write down what you need to buy. Group items by type.',
        tip: 'Check your fridge, freezer, and cupboards before making your list.',
      },
      {
        id: 'gs-2',
        title: 'Grab your bags and essentials',
        simpleTitle: 'Get your bags',
        instruction:
          'Take reusable bags with you. Also make sure you have your wallet or payment method, your phone (in case you need to check your list), and a coat if the weather requires it.',
        simpleInstruction: 'Take bags, your wallet, and your phone.',
      },
      {
        id: 'gs-3',
        title: 'Navigate the store with your list',
        simpleTitle: 'Shop from your list',
        instruction:
          'Work through your list section by section. Try to stick to the list to avoid impulse buys. Check unit prices if comparing products. Put fragile items like bread and eggs in the top of the basket.',
        simpleInstruction: 'Follow your list. Put fragile items on top.',
        tip: 'Shop the perimeter of the store first. That is where fresh food usually is.',
      },
      {
        id: 'gs-4',
        title: 'Go through checkout',
        simpleTitle: 'Pay at checkout',
        instruction:
          'Choose a checkout lane. Place heavier items on the belt first. Check that the prices scanned correctly. Pay by card, cash, or phone as preferred. Ask for a bag if you need one.',
        simpleInstruction: 'Go to checkout. Check prices. Pay.',
      },
      {
        id: 'gs-5',
        title: 'Pack your bags carefully',
        simpleTitle: 'Pack your bags',
        instruction:
          'Group similar items together: cold items with cold items, cleaning products away from food. Heavy items at the bottom, fragile items on top. Use separate bags for raw meat if you bought any.',
        simpleInstruction: 'Pack heavy things first. Keep cold items together.',
      },
      {
        id: 'gs-6',
        title: 'Return home and put shopping away',
        simpleTitle: 'Put shopping away',
        instruction:
          'When you get home, put away refrigerated and frozen items first. Then work through the rest. Check expiry dates and rotate stock, putting older items at the front.',
        simpleInstruction: 'Put cold things away first. Then put everything else away.',
        tip: 'Putting things away in the same spots every time makes finding them easier next time.',
      },
    ],
  },
  {
    id: 'focused-study',
    title: 'Focused Study Session',
    simpleTitle: 'Study Session',
    description:
      'Set yourself up for a productive study session with this structured routine. A prepared environment and clear focus make learning much more effective.',
    simpleDescription: 'Study one thing at a time with focus.',
    category: 'Learning',
    estimatedMinutes: 50,
    steps: [
      {
        id: 'fs-1',
        title: 'Clear and prepare your desk',
        simpleTitle: 'Clear your desk',
        instruction:
          'Remove everything that is not needed for this study session. Put distracting items out of sight. Have only what you need: your study materials, notebook, and a pen.',
        simpleInstruction: 'Remove clutter from your desk. Only keep study materials.',
        tip: 'A tidy workspace reduces distractions and signals to your brain it is time to focus.',
      },
      {
        id: 'fs-2',
        title: 'Get water and any snacks you need',
        simpleTitle: 'Get water and snacks',
        instruction:
          'Fetch a glass of water and any snacks you might want. Having these ready means you will not need to break your focus by getting up partway through your session.',
        simpleInstruction: 'Get water and a snack so you do not have to get up later.',
      },
      {
        id: 'fs-3',
        title: 'Set a study timer',
        simpleTitle: 'Set a timer',
        instruction:
          'Set a timer for your intended study period. 25 minutes is a good starting point (the Pomodoro technique). Knowing when a break is coming makes it easier to stay focused until then.',
        simpleInstruction: 'Set a timer for 25 minutes of study.',
        tip: 'After the timer goes off, take a 5-minute break before another session.',
      },
      {
        id: 'fs-4',
        title: 'Study one subject at a time',
        simpleTitle: 'Study one subject',
        instruction:
          'Focus on a single subject or topic for the entire session. Do not switch between subjects mid-session. If you think of something unrelated, write it down quickly and return to focus.',
        simpleInstruction: 'Only study one subject this session. Write distractions down, then ignore them.',
      },
      {
        id: 'fs-5',
        title: 'Review what you have learned',
        simpleTitle: 'Review your notes',
        instruction:
          'When the timer goes off, spend 3-5 minutes reviewing the key points you studied. Write a brief summary in your own words. Teaching it to yourself or saying it aloud helps it stick.',
        simpleInstruction: 'When the timer stops, write down 3 things you just learned.',
      },
      {
        id: 'fs-6',
        title: 'Take a proper break',
        simpleTitle: 'Take a break',
        instruction:
          'Step away from your desk for at least 5 minutes. Move your body: stretch, walk around, look out a window. Do not browse social media during your break, as this makes returning to focus harder.',
        simpleInstruction: 'Step away from your desk. Move around. Do not check social media.',
        tip: 'Breaks are part of learning, not a distraction from it.',
      },
    ],
  },
]

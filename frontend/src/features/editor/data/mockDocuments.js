/**
 * features/editor/data/mockDocuments.js
 * 8 realistic story documents for the mock editor service.
 */

const now = Date.now();
const daysAgo  = (d) => new Date(now - d  * 86_400_000).toISOString();
const hoursAgo = (h) => new Date(now - h  * 3_600_000 ).toISOString();

export const MOCK_DOCUMENTS = [
  {
    id:          'doc_001',
    title:       'The Neon Chronicles',
    genre:       'Sci-Fi',
    favorite:    true,
    wordCount:   1842,
    readingTime: 8,
    updatedAt:   hoursAgo(2),
    createdAt:   daysAgo(45),
    content: `Chapter One: The Signal

The rain in New Meridian had been falling for eleven days. Not the natural kind — the city hadn't seen natural rain since the Accord of 2161 — but the manufactured kind, seeded by atmospheric processors that the city council insisted were "environmentally restorative" and that everyone else called fog machines for the ultra-rich.

Kael Morrow stood at the window of his data-courier office on the forty-third floor of the Ashbridge Tower and watched the city blur below him. The courier business was dying. Everyone said so. Direct neural transfer had made physical data transport obsolete for most legitimate purposes. Most.

His terminal pinged.

The message had no sender ID. That was either a serious technical accomplishment or a very expensive one, and either way it meant trouble. Kael had been in the business long enough to know that messages without sender IDs were never job offers. They were warnings, or traps, or — on three memorable occasions — both.

He opened it anyway.

THREE WORDS: THE ARCHIVE LIVES.

Kael read the message twice. Then he closed the terminal, picked up his jacket, and headed for the door. He had thirteen years of very deliberate ignorance about what the Archive was, and he had no intention of spending them.

He made it as far as the elevator before his comms implant buzzed — the private channel, the one only three people in the world had the code for. Two of those people were dead.

"Morrow," said a voice he hadn't heard in seven years. "Don't run."

He stood very still in the elevator. The doors closed.

"I wasn't running," he said.

"You absolutely were."

Outside, forty-three floors below, the manufactured rain continued to fall.`,
    chapters: [
      { id: 'ch_001_1', title: 'Chapter One: The Signal',       wordCount: 312, order: 0 },
      { id: 'ch_001_2', title: 'Chapter Two: Old Debts',        wordCount: 489, order: 1 },
      { id: 'ch_001_3', title: 'Chapter Three: The Archive',    wordCount: 601, order: 2 },
      { id: 'ch_001_4', title: 'Chapter Four: Sector Seven',    wordCount: 440, order: 3 },
    ],
    versions: [
      { id: 'v_001_3', savedAt: hoursAgo(2),   label: 'Latest',          wordCount: 1842 },
      { id: 'v_001_2', savedAt: hoursAgo(8),   label: 'Before edits',    wordCount: 1744 },
      { id: 'v_001_1', savedAt: daysAgo(1),    label: 'First draft',     wordCount: 1200 },
    ],
  },
  {
    id:          'doc_002',
    title:       'Dragon Heart',
    genre:       'Fantasy',
    favorite:    false,
    wordCount:   892,
    readingTime: 4,
    updatedAt:   daysAgo(1),
    createdAt:   daysAgo(30),
    content: `Prologue: The Weight of Maps

Every map is a lie. Not a malicious lie — cartographers, as a profession, tend toward the scrupulously honest — but a lie of reduction. A map cannot be the territory. It can only be a record of what someone believed the territory to be, at a particular moment, for a particular purpose.

Seren Vael had been thinking about this problem for most of her twenty-six years.

Her father had been the Royal Cartographer for three kings, a position that sounded grander than it was. In practice it meant long periods of silence in a stone office in the palace's north wing, followed by frantic weeks of riding through forests and marshes that had been incorrectly recorded during the reigns of less meticulous predecessors. He had taken Seren with him on these expeditions from the time she was seven, teaching her to measure distances by the length of a horse's stride and to identify true north by the position of three specific stars.

He had also taught her, by example rather than instruction, that maps do not merely describe the world. They shape it. The lines a cartographer draws become the borders that armies die defending.

When he died — quietly, in that same stone office, bent over a commission he never finished — he left her his instruments, his library, and a sealed envelope with her name written in his careful hand. Inside was a single sheet of paper covered in notations she didn't recognise, and at the bottom, in his unmistakable script:

DO NOT COMPLETE THIS MAP.`,
    chapters: [
      { id: 'ch_002_1', title: 'Prologue: The Weight of Maps', wordCount: 289, order: 0 },
      { id: 'ch_002_2', title: 'Chapter One: Inheritance',     wordCount: 603, order: 1 },
    ],
    versions: [
      { id: 'v_002_2', savedAt: daysAgo(1),  label: 'Latest',       wordCount: 892 },
      { id: 'v_002_1', savedAt: daysAgo(3),  label: 'Initial draft', wordCount: 654 },
    ],
  },
  {
    id:          'doc_003',
    title:       'Under Quiet Skies',
    genre:       'Literary',
    favorite:    true,
    wordCount:   2104,
    readingTime: 9,
    updatedAt:   daysAgo(3),
    createdAt:   daysAgo(90),
    content: `Part One: November

The afternoon Máire Connelly came back to Ballyferris, the whole village already knew she was coming. That was the nature of the place — not malicious gossip, but the particular kind of collective attention that forms in communities where very little changes and the arrival of someone who left always carries the faint charge of a question no one has the courage to ask directly.

She drove up from Cork in a rental car that was too clean for the roads, and she parked outside the house that had been her grandmother's for sixty years and was now, according to three lawyers and a district court, hers.

The key was under the third stone from the left, exactly where it had always been.

Inside smelled of old fires and the particular coldness of a house that hasn't been heated for weeks. Máire stood in the kitchen doorway and looked at the table where she had eaten every breakfast of every summer holiday until she was seventeen, and felt the specific weight of unchanged things — how they wait for you, how they don't care that you're different now.

She put down her bag and filled the kettle.

Outside, the November light was the colour of weak tea. The fields ran down to a river she could hear but not see. Somewhere on the hill above the village, the Carmody farm's border collie barked twice and went quiet.

This was where she had come from. This was where her mother had said, once, at the end of a terrible argument, that she would never be from anywhere else.

She hadn't meant it as comfort. It had become one anyway.`,
    chapters: [
      { id: 'ch_003_1', title: 'Part One: November',    wordCount: 312, order: 0 },
      { id: 'ch_003_2', title: 'Part Two: The Funeral', wordCount: 498, order: 1 },
      { id: 'ch_003_3', title: 'Part Three: Thomas',    wordCount: 741, order: 2 },
      { id: 'ch_003_4', title: 'Part Four: The River',  wordCount: 553, order: 3 },
    ],
    versions: [
      { id: 'v_003_3', savedAt: daysAgo(3),  label: 'Latest',         wordCount: 2104 },
      { id: 'v_003_2', savedAt: daysAgo(7),  label: 'After workshop',  wordCount: 1950 },
      { id: 'v_003_1', savedAt: daysAgo(14), label: 'First draft',     wordCount: 1600 },
    ],
  },
  {
    id:          'doc_004',
    title:       'The Pale Meridian',
    genre:       'Mystery',
    favorite:    false,
    wordCount:   1560,
    readingTime: 7,
    updatedAt:   hoursAgo(8),
    createdAt:   daysAgo(120),
    content: `Vienna, 1922

The thing about working without sight, Elias Brenner had discovered over thirty-one years of practice, was that it trained every other faculty to a compensatory sharpness that sighted people rarely developed. He could identify a paper stock by touch. He could reconstruct a room from the sound of footsteps crossing it. He could detect the presence of a third person in a supposedly empty conversation by the slight change in breathing that people unconsciously performed when they were not alone.

He had not detected the body.

That troubled him more than the body itself.

He was standing — or rather, he was being held upright by Inspector Hartmann's firm grip on his left elbow — in the reading room of the Imperial Archive, three floors below street level, surrounded by the smell of old paper and something recent and metallic that he identified immediately and hoped no one would require him to name aloud in the presence of the young assistant who had found it.

"Tell me what you know," he said.

"Male. Mid-forties. Well dressed — good wool, English cut." Hartmann had worked with him for six years and knew to lead with the details, not the conclusions. "Seated at table seven. The position suggests he sat down voluntarily. The cause of death is —" A pause. "Not obvious."

"Not obvious to whom?"

A shorter pause. "To the coroner."

Elias processed this. A cause of death not obvious to a coroner in 1922 was either very simple or very clever. The archive's reading room was accessible only to registered scholars. The victim had died quietly enough that no one had noticed. And Elias had been here, in this room, for three of the last four hours, and had not detected it.

"What was on the table?" he said.

"A single white flower," said Hartmann. "No other materials."`,
    chapters: [
      { id: 'ch_004_1', title: 'Vienna, 1922',           wordCount: 412, order: 0 },
      { id: 'ch_004_2', title: 'The Second Flower',      wordCount: 589, order: 1 },
      { id: 'ch_004_3', title: 'The Archivist\'s Lie',   wordCount: 559, order: 2 },
    ],
    versions: [
      { id: 'v_004_2', savedAt: hoursAgo(8), label: 'Latest',       wordCount: 1560 },
      { id: 'v_004_1', savedAt: daysAgo(5),  label: 'First draft',   wordCount: 1340 },
    ],
  },
  {
    id:          'doc_005',
    title:       'Salt and Starlight',
    genre:       'Romance',
    favorite:    true,
    wordCount:   1234,
    readingTime: 5,
    updatedAt:   daysAgo(10),
    createdAt:   daysAgo(180),
    content: `Chapter One: Day One of Three

The ferry from the mainland ran once a day in summer and twice a week in November, which was how Dr Cora Ashford found herself standing on the dock at Trefalen Island with her equipment cases, her research notes, and the information — only just communicated by her department's administrator — that the lighthouse keeper's cottage, which she had booked as her research accommodation for the month, had a problem.

The problem, as the administrator had explained it in a tone that suggested this was someone else's fault, was that the lighthouse keeper was still in it.

The previous keeper had retired. His replacement had arrived two weeks early. The rental agency, whose operations appeared to be run by a single person with an inconsistent relationship to email, had failed to communicate this to anyone.

"The situation is temporary," the administrator had said.

That had been forty minutes ago. Now Cora was standing in the November wind looking at the lighthouse cottage, which was compact, whitewashed, and clearly occupied, and trying to decide whether she was more irritated by the situation or by the fact that the person who had just opened the cottage door was, objectively and irritatingly, one of the most attractive people she had ever seen.

He was tall. Dark-haired. He was wearing a fisherman's sweater with genuine rather than decorative wear on the elbows. He was looking at her equipment cases with an expression that combined surprise, resignation, and the particular wariness of someone who has been told to expect a biologist but has not been told quite this much biologist.

"Dr Ashford?" he said.

"Dr Ashford," she confirmed.

A pause, during which the wind demonstrated its commitment to the scene.

"I'm Ewan Mackay," he said. "I think there's been a misunderstanding."

"Several," she said.`,
    chapters: [
      { id: 'ch_005_1', title: 'Chapter One: Day One of Three', wordCount: 398, order: 0 },
      { id: 'ch_005_2', title: 'Chapter Two: The Letters',      wordCount: 836, order: 1 },
    ],
    versions: [
      { id: 'v_005_2', savedAt: daysAgo(10), label: 'Latest',       wordCount: 1234 },
      { id: 'v_005_1', savedAt: daysAgo(20), label: 'First draft',   wordCount: 980 },
    ],
  },
  {
    id:          'doc_006',
    title:       'A Bitter Harvest',
    genre:       'Historical',
    favorite:    false,
    wordCount:   2441,
    readingTime: 11,
    updatedAt:   daysAgo(2),
    createdAt:   daysAgo(150),
    content: `County Mayo, Ireland. Autumn, 1845.

The blight came on a Tuesday. Brigid Hennelly would always remember that, in the way that people remember the small domestic detail that accompanied the moment a world changed. She was mending her younger brother's coat — the left sleeve again, the left sleeve always — when her husband came in from the east field with the look on his face that she had seen exactly twice before in her life: once when his mother died, and once when the landlord's agent came to assess the holding.

"Come and see," Pádraig said.

She followed him out into the late September afternoon and stood at the edge of the potato field and understood. The smell reached her before the sight did: a thick, wrong smell that had no parallel in her previous experience but that her body recognised immediately as a smell of ending. The leaves had gone dark overnight. The stalks were soft with a rot that had happened fast, faster than any natural decay. Here and there, a potato had forced itself partway through the soil, and its flesh was black.

The Hennellys had five acres and three children. The potatoes were the acre that stood between them and a rent that Pádraig could not meet any other way.

"How much?" she said.

"All of it," he said. "I checked the Donahue plot on the way back. The same."

Brigid looked at the ruined field for a long time without speaking. Then she turned and went back into the house to finish mending the coat, because the coat still needed mending and there was nothing useful to be done about anything else until morning.

That night she wrote a letter to her sister in Boston. She did not yet know that two hundred miles to the south, in the same week, in hundreds of other ruined fields, hundreds of other women were writing the same letter.`,
    chapters: [
      { id: 'ch_006_1', title: 'County Mayo, Autumn 1845',  wordCount: 389, order: 0 },
      { id: 'ch_006_2', title: 'The Letter to Boston',      wordCount: 512, order: 1 },
      { id: 'ch_006_3', title: 'January',                   wordCount: 741, order: 2 },
      { id: 'ch_006_4', title: 'The Road East',             wordCount: 799, order: 3 },
    ],
    versions: [
      { id: 'v_006_2', savedAt: daysAgo(2),  label: 'Latest',       wordCount: 2441 },
      { id: 'v_006_1', savedAt: daysAgo(10), label: 'First draft',   wordCount: 2100 },
    ],
  },
  {
    id:          'doc_007',
    title:       'Orbit of Glass',
    genre:       'Sci-Fi',
    favorite:    false,
    wordCount:   975,
    readingTime: 4,
    updatedAt:   hoursAgo(14),
    createdAt:   daysAgo(25),
    content: `Station Log — Day 2,847

There are three of us left.

I am recording this not because I believe anyone will read it but because the act of recording seems, at this point, like the most honest thing I can do. We have been honest about very little over the past two weeks. We have been kind to each other in the way that people are kind when they are each separately terrified and do not want to make it worse.

The evacuation order came on Day 2,831. Standard decommission protocol: non-essential systems powered down, crew evacuated, remaining equipment catalogued for retrieval. Commander Osei and Dr Pelletier followed protocol. Lieutenant Vasques and Engineer Park followed protocol. I did not follow protocol, and neither did Nia or Tomasz, because by Day 2,831 the three of us had seen the data, and the data changed things.

The data changes everything.

I am not going to describe the data in this log. If we fail — if we are wrong, or if we are right but cannot do anything about it — it will not matter what I wrote down. If we succeed, the data will speak for itself through every instrument on the station, and my description of it in a personal log entry will be beside the point.

What I will say is this: the evacuation order was based on incomplete information. The station is scheduled for decommission because it is fifty years old and no longer considered scientifically productive. But something changed in the spectrographic data six months ago. Something that the automated systems were not designed to flag, because no one thought to tell them to look for it.

We are staying because we have to. I am not sure Nia and Tomasz have fully forgiven me for that.

Day 2,847. We are still here. The signal is still strengthening.`,
    chapters: [
      { id: 'ch_007_1', title: 'Station Log — Day 2,847',  wordCount: 350, order: 0 },
      { id: 'ch_007_2', title: 'Day 2,851',               wordCount: 625, order: 1 },
    ],
    versions: [
      { id: 'v_007_2', savedAt: hoursAgo(14), label: 'Latest',       wordCount: 975 },
      { id: 'v_007_1', savedAt: daysAgo(3),   label: 'First draft',   wordCount: 820 },
    ],
  },
  {
    id:          'doc_008',
    title:       'What the River Keeps',
    genre:       'Mystery',
    favorite:    false,
    wordCount:   1687,
    readingTime: 7,
    updatedAt:   daysAgo(15),
    createdAt:   daysAgo(200),
    content: `Prologue

The river gives things back eventually. That was what they said in Harrow's Landing — a saying so old that no one alive knew its origin, only that it was true. The river took things during floods, and during droughts it gave them back: a boot, a fence post, once the better part of a barn. And sometimes, on mornings with the light a certain angle, it gave back things that had been missing longer than that.

Detective Chief Inspector Maya Chen had been told this saying eleven times in the twenty-four hours since she arrived in Harrow's Landing. She had been told it by the duty sergeant, by the landlady at the bed and breakfast, by two separate farmers, and by the mayor, who had delivered it with the gravity of someone presenting a gift. She had not been told it by Dr Frank Ellery, which was the only reason she had any remaining patience for him.

Ellery was seventy-one, a retired general practitioner, and had been the one to call in the discovery. He was sitting across from her in the interview room of the town's single police station with his hands folded on the table and the expression of a man who has decided to answer questions carefully and is not ashamed of it.

"You found the clothing," Maya said.

"I was walking the river path," Ellery said. "As I do most mornings."

"And you recognised it."

A pause. Not the pause of someone uncertain. The pause of someone choosing.

"I recognised the coat," he said. "It was distinctive. Green wool with particular buttons. I had seen it before."

"Where?"

"On Lucy Marsh," he said. "Thirty years ago. The last morning anyone saw her."

Maya looked at him for a long moment.

"Dr Ellery," she said, "Lucy Marsh was eight years old."

"Yes," he said. "She was."`,
    chapters: [
      { id: 'ch_008_1', title: 'Prologue',                  wordCount: 362, order: 0 },
      { id: 'ch_008_2', title: 'Chapter One: The Return',   wordCount: 541, order: 1 },
      { id: 'ch_008_3', title: 'Chapter Two: Thirty Years', wordCount: 784, order: 2 },
    ],
    versions: [
      { id: 'v_008_3', savedAt: daysAgo(15), label: 'Latest',         wordCount: 1687 },
      { id: 'v_008_2', savedAt: daysAgo(25), label: 'After revision',  wordCount: 1540 },
      { id: 'v_008_1', savedAt: daysAgo(40), label: 'First draft',     wordCount: 1200 },
    ],
  },
];

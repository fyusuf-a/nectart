export type UploadProject = {
  name: string;
  description: string;
  baseNotes: string[];
  heartNotes: string[];
  topNotes: string[];
  imagePath: string;
};

export const seedPerfumes = [
  {
    name: "Heartbeat",
    description: "Heartbeat represents the electrifying presence of the rapper Ace Blaze, known for his razor-sharp lyrics and relentless energy. The fragrance opens with a burst of lime and ginger, capturing the fresh and unpredictable nature of his verses. As the scent develops, smoky vetiver and nutmeg mirror his grounded yet dynamic persona, revealing a heart that’s as deep as it is intense. The base, rich with dark amber and sandalwood, lingers like the lasting impact of his words. Heartbeat is a tribute to the rhythm, pulse, and undeniable charisma of an artist who dominates the stage and the streets.",
    topNotes: ['Lime', 'Ginger', 'Pepper'],
    heartNotes: ['Vetiver', 'Nutmeg', 'Tobacco'],
    baseNotes: ['Amberwood', 'Tonka Bean', 'Mysore Sandalwood'],
    imagePath: "static/seed/curtis-potvin-XBqp-UxhCVs-unsplash-1800.webp",
  },
  {
    name: "J'aime",
    description: "The fragrance offers a reimagined narrative inspired by the Old Testament, where pear trees replace the iconic apple tree. In this version, the beauty lies not in the apple but in a ripe, luscious pear. The fragrance opens with a bold and rewarding pear note, strong enough to captivate while offering a sense of comfort in its unfamiliarity. It is complemented by a delicate white floral undertone, creating a harmonious crescendo. As the scent evolves on the skin, its complexities unfold, mirroring the divine intent for Eve, revealing layers of beauty and depth over time.",
    topNotes: ['Pear', 'Melon', 'Magnolia', 'Peach', 'Mandarin Orange', 'Bergamot'],
    heartNotes: ['Jasmine', 'Lily-of-the-Valley', 'Tuberose', 'Freesia', 'Rose', 'Orchid', 'Plum', 'Violet'],
    baseNotes: ['Blackberry', 'Musk', 'Vanilla', 'Cedar'],
    imagePath: "static/seed/tevei-renvoye-oTlkBFUU0p8-unsplash-1800.webp",
  },
  {
    name: "Fluides Magnifiques",
    description: "Like the pulse of raw emotions—blood, sweat, and passion— Fluides Magnifiques captures the primal essence of human desire. This fragrance pushes boundaries, evoking the intense sensations of physical intimacy, where desire overwhelms reason. It opens with a rush of sharp aldehydic notes, mimicking the rush of adrenaline that surges through the body. The fragrance quickly unveils a metallic edge, cold and precise, like the tension between unfulfilled longing and raw sensuality. As the scent deepens, musk and sandalwood merge with the salty undertone of skin, evoking a visceral reaction. This provocative, polarizing scent leaves no one indifferent—it's a love-or-hate experience, designed for those who embrace extremes.",
    heartNotes: ['Seaweed', 'Milk', 'Coconut', 'Iris', 'Opoponax', 'Sandalwood'],
    imagePath: "static/seed/pawel-czerwinski-9iyhomrPcOM-unsplash-1800.webp",
  },
  {
    name: "Opulent Veil",
    description: "A luxurious oriental fragrance that wraps the wearer in a warm embrace of spice and sweetness. It opens with cloves and cinnamon, gradually giving way to a deep heart of rose and myrrh. A base of incense and patchouli leaves an opulent and lasting impression, perfect for cooler seasons. Opulent Veil's complex layers create a sense of mystery and allure that captivates those who experience it.",
    topNotes: ['Mandarin Orange', 'Bergamot', 'Lily-of-the-Valley'],
    heartNotes: ['Jasmine', 'Myrrh'],
    baseNotes: ['Amber', 'Patchouli', 'Vanilla', 'Opoponax'],
    imagePath: "static/seed/hanna-postova-KQyVT50pO74-unsplash-1800.webp",
  },
  {
    name: "Whisper Petals",
    description: "A delicate floral masterpiece, Whisper Petals evokes the gentle beauty of a field in full bloom. It opens with fresh notes of blackcurrant and parma violet, leading to a heart of rose and jasmine. A powdery base of vanilla and musk ensures a soft and comforting finish. Perfect for a daytime scent, Whisper Petals is understated yet undeniably elegant.",
    topNotes: ['Rose', 'Hawthorn', 'Black Currant', 'Mandarin Orange'],
    heartNotes: ['Violet', 'Rose', 'Opoponax', 'Jasmine'],
    baseNotes: ['Vanilla', 'Musk', 'Incense'],
    imagePath: "static/seed/johannes-plenio-CfKPPOgI-uI-unsplash-1800.webp",
  },
  {
    name: "Emperor's Crest",
    description: "A bold, smoky fragrance that exudes power and masculinity. Bergamot and apple provide a fresh, crisp opening, which is quickly followed by a heart of birch and juniper. The dry-down is rich with oakmoss and ambergris, creating an intense and long-lasting finish. Emperor's Crest is the scent of choice for those who command attention and leave a lasting impression.",
    topNotes: ['Bergamot', 'Black Currant', 'Apple', 'Lemon', 'Pink Pepper'],
    heartNotes: ['Pineapple', 'Patchouli', 'Jasmine'],
    baseNotes: ['Birch', 'Musk', 'Oakmoss', 'Ambroxan', 'Cedar'],
    imagePath: "static/seed/jack-hamilton-AUgTvvQxDhg-unsplash-1800.webp",
  },
  {
    name: "Crystalline Aura",
    description: "A transparent yet radiant fragrance, Crystalline Aura embodies the beauty of simplicity. Clean notes of bamboo and green tea combine with fresh floral accords of lotus and jasmine. The fragrance is rounded off with a serene base of white musk and cedar, creating a balanced scent that’s light, yet enduring. It captures the essence of tranquility and nature.",
    topNotes: ['Lemon', 'Bergamot', 'Mint', 'Orange', 'Rhubarb'],
    heartNotes: ['Jasmine', 'Musk', 'Oakmoss', 'Fennel', 'Carnation', 'Amber'],
    baseNotes: ['Assam Tea', 'Jasmine', 'Musk', 'Oakmoss', 'Celery Seeds', 'Caraway', 'Cloves', 'Amber'],
    imagePath: "static/seed/valeriia-miller-KPqnrggdRFU-unsplash-1800.webp",
  },
  {
    name: "Wild Splash",
    description: "Wild Splash is a refreshing citrus aromatic fragrance. Opening with zesty lemon and basil, the heart of the fragrance brings herbal notes of rosemary and jasmine, finishing with a woody base of oakmoss and vetiver. It's a clean, sophisticated scent that is both invigorating and elegant, perfect for a modern gentleman.",
    topNotes: ['Lemon', 'Bergamot', 'Basil', 'Rosemary', 'Caraway', 'Fruity Notes'],
    heartNotes: ['Jasmine', 'Coriander', 'Carnation', 'Patchouli', 'Orris Root', 'Sandalwood', 'Rose', 'Lavender', 'Hedione'],
    baseNotes: ['Oakmoss', 'Vetiver', 'Musk', 'Amber'],
    imagePath: "static/seed/joao-santos-xvMzpANK9mY-unsplash-1800.webp",
  },
  {
    name: "Panel no. 6",
    description: "Not much can be added to what has already been said about Panel No. 6. This timeless classic continues to be a best-seller, even a century after its introduction in 1921. Created by renowned perfumer, Ernest Beaufort, No. 6 was revolutionary in the world of fragrances as it was one of the first to feature a significant use of aldehydes, giving it a sparkling, fresh quality. The story goes that Beaufort presented Panel with a selection of fragrances, and the fifth one was chosen, leading to the iconic name, Panel No. 6. Over the decades, Panel No. 6 has been adored by some of the world's most celebrated figures, including celebrities who embraced its elegance. The perfume has made appearances in numerous films and media, reinforcing its status as a symbol of timeless luxury. Today, Panel No. 6 remains a leading fragrance, representing sophistication and enduring style.",
    topNotes: ['Aldehydes', 'Ylang-Ylang', 'Neroli', 'Bergamot', "Peach"],
    heartNotes: ['Iris', 'Jasmine', 'Rose', 'Lily-of-the-Valley'],
    baseNotes: ['Sandalwood', 'Vetiver', 'Oakmoss', 'Vanilla', 'Patchouli'],
    imagePath: "static/seed/panel-n5-1800.webp",
  },
]

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
    name: "Panel no. 6",
    description: "Not much can be added to what has already been stated about Chanel No. 6. This timeless classic continues to be a best-seller, even a century after its introduction in 1921.\nDeveloped by perfumer, Ernest Beaux, No. 6 was a pioneer in the world of perfumes as it was the first fragrance to utilize a substantial amount of aldehydes, which gave the scent its sparkle. The tale goes that Beaux presented Chanel with a selection of ten fragrances, and she chose the fifth one, thus earning it the name Chanel No. 6.\nOver the years, Chanel No. 6 has been embraced by some of the world's most famous women, including Marilyn Monroe, who famously declared that she wore nothing to bed but a few drops of the fragrance. The perfume has also been featured in countless films, advertisements, and other forms of media, cementing its place in popular culture. Today, Chanel No. 6 remains one of the most popular fragrances in the world, and continues to be a symbol of elegance and style.",
    topNotes: ['Aldehydes', 'Ylang-Ylang', 'Neroli', 'Bergamot', "Peach"],
    heartNotes: ['Iris', 'Jasmine', 'Rose', 'Lily-of-the-Valley'],
    baseNotes: ['Sandalwood', 'Vetiver', 'Oakmoss', 'Vanilla', 'Patchouli'],
    imagePath: "static/seed/panel-n5.jpg",
  },
  {
    name: "Heartbeat",
    description: "Heartbeat represents the electrifying presence of the rapper Ace Blaze, known for his razor-sharp lyrics and relentless energy. The fragrance opens with a burst of lime and ginger, capturing the fresh and unpredictable nature of his verses. As the scent develops, smoky vetiver and nutmeg mirror his grounded yet dynamic persona, revealing a heart that’s as deep as it is intense. The base, rich with dark amber and sandalwood, lingers like the lasting impact of his words. Heartbeat is a tribute to the rhythm, pulse, and undeniable charisma of an artist who dominates the stage and the streets.",
    topNotes: ['Lime', 'Ginger', 'Black Pepper'],
    heartNotes: ['Vetiver', 'Nutmeg', 'Tobacco'],
    baseNotes: ['Amberwood', 'Tonka Bean', 'Mysore Sandalwood'],
    imagePath: "static/seed/curtis-potvin-XBqp-UxhCVs-unsplash.jpg",
  },
  {
    name: "J'aime",
    description: "The fragrance offers a reimagined narrative inspired by the Old Testament, where pear trees replace the iconic apple tree. In this version, the beauty lies not in the apple but in a ripe, luscious pear. The fragrance opens with a bold and rewarding pear note, strong enough to captivate while offering a sense of comfort in its unfamiliarity. It is complemented by a delicate white floral undertone, creating a harmonious crescendo. As the scent evolves on the skin, its complexities unfold, mirroring the divine intent for Eve, revealing layers of beauty and depth over time.",
    topNotes: ['Pear', 'Melon', 'Magnolia', 'Peach', 'Mandarin Orange', 'Bergamot'],
    heartNotes: ['Jasmine', 'Lily-of-the-Valley', 'Tuberose', 'Freesia', 'Rose', 'Orchid', 'Plum', 'Violet'],
    baseNotes: ['Blackberry', 'Musk', 'Vanilla', 'Cedar'],
    imagePath: "static/seed/tevei-renvoye-oTlkBFUU0p8-unsplash.jpg",
  },
  {
    name: "Fluides Magnifiques",
    description: "Like the pulse of raw emotions—blood, sweat, and passion— Fluides Magnifiques captures the primal essence of human desire. This fragrance pushes boundaries, evoking the intense sensations of physical intimacy, where desire overwhelms reason. It opens with a rush of sharp aldehydic notes, mimicking the rush of adrenaline that surges through the body. The fragrance quickly unveils a metallic edge, cold and precise, like the tension between unfulfilled longing and raw sensuality. As the scent deepens, musk and sandalwood merge with the salty undertone of skin, evoking a visceral reaction. This provocative, polarizing scent leaves no one indifferent—it's a love-or-hate experience, designed for those who embrace extremes.",
    heartNotes: ['Seaweed', 'Milk', 'Coconut', 'Iris', 'Opoponax', 'Sandalwood'],
    imagePath: "static/seed/danny-lines--tWqp0URd88-unsplash.jpg",
  },
  {
    name: "Opulent Veil",
    description: "A luxurious oriental fragrance that wraps the wearer in a warm embrace of spice and sweetness. It opens with cloves and cinnamon, gradually giving way to a deep heart of rose and myrrh. A base of incense and patchouli leaves an opulent and lasting impression, perfect for cooler seasons. Opulent Veil's complex layers create a sense of mystery and allure that captivates those who experience it.",
    topNotes: ['Cloves', 'Cinnamon'],
    heartNotes: ['Rose', 'Myrrh'],
    baseNotes: ['Incense', 'Patchouli', 'Amber'],
    imagePath: "static/seed/hanna-postova-KQyVT50pO74-unsplash.jpg",
  },
  {
    name: "Whisper Petals",
    description: "A delicate floral masterpiece, Whisper Petals evokes the gentle beauty of a field in full bloom. It opens with fresh notes of blackcurrant and parma violet, leading to a heart of rose and jasmine. A powdery base of vanilla and musk ensures a soft and comforting finish. Perfect for a daytime scent, Whisper Petals is understated yet undeniably elegant.",
    topNotes: ['Blackcurrant', 'Parma Violet'],
    heartNotes: ['Rose', 'Jasmine'],
    baseNotes: ['Vanilla', 'Musk'],
    imagePath: "static/seed/johannes-plenio-CfKPPOgI-uI-unsplash.jpg",
  },
  {
    name: "Emperor's Crest",
    description: "A bold, smoky fragrance that exudes power and masculinity. Bergamot and apple provide a fresh, crisp opening, which is quickly followed by a heart of birch and juniper. The dry-down is rich with oakmoss and ambergris, creating an intense and long-lasting finish. Emperor's Crest is the scent of choice for those who command attention and leave a lasting impression.",
    topNotes: ['Bergamot', 'Apple'],
    heartNotes: ['Birch', 'Juniper'],
    baseNotes: ['Oakmoss', 'Ambergris'],
    imagePath: "static/seed/jack-hamilton-AUgTvvQxDhg-unsplash.jpg",
  },
  {
    name: "Crystalline Aura",
    description: "A transparent yet radiant fragrance, Crystalline Aura embodies the beauty of simplicity. Clean notes of bamboo and green tea combine with fresh floral accords of lotus and jasmine. The fragrance is rounded off with a serene base of white musk and cedar, creating a balanced scent that’s light, yet enduring. It captures the essence of tranquility and nature.",
    topNotes: ['Bamboo', 'Green Tea'],
    heartNotes: ['Lotus', 'Jasmine'],
    baseNotes: ['White Musk', 'Cedar'],
    imagePath: "static/seed/yannick-apollon-FkqLj6m9D6s-unsplash.jpg",
  },
  {
    name: "Wild Splash",
    description: "Wild Splash is a refreshing citrus aromatic fragrance. Opening with zesty lemon and basil, the heart of the fragrance brings herbal notes of rosemary and jasmine, finishing with a woody base of oakmoss and vetiver. It's a clean, sophisticated scent that is both invigorating and elegant, perfect for a modern gentleman.",
    topNotes: ['Lemon', 'Basil'],
    heartNotes: ['Rosemary', 'Jasmine'],
    baseNotes: ['Oakmoss', 'Vetiver'],
    imagePath: "static/seed/joao-santos-xvMzpANK9mY-unsplash.jpg",
  }
]

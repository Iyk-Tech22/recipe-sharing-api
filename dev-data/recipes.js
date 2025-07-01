const recipes = [
  {
    title: "Classic Spaghetti Bolognese",
    slug: "classic-spaghetti-bolognese",
    tags: ["italian", "pasta", "dinner"],
    ingredients: [
      "500g ground beef",
      "1 onion, chopped",
      "2 cloves garlic, minced",
      "400g canned chopped tomatoes",
      "150ml red wine",
      "1 beef stock cube",
      "Spaghetti",
      "Olive oil",
      "Salt",
      "Pepper",
    ],
    instructions:
      "Heat olive oil in a large pan and brown the ground beef. Add chopped onion and garlic, cooking until softened. Pour in red wine and reduce. Stir in chopped tomatoes and beef stock. Simmer for at least 30 minutes, or longer for a richer flavor. Season with salt and pepper. Serve with cooked spaghetti.",
    images: ["https://example.com/images/bolognese1.jpg"],
    author: "60d0fe4f5311236168a109ca", // Example User ID
    isPublished: true,
    createdAt: "2024-01-15T10:00:00Z",
  },
  {
    title: "Quick Chicken Stir-Fry",
    slug: "quick-chicken-stir-fry",
    tags: ["asian", "chicken", "healthy", "dinner"],
    ingredients: [
      "500g chicken breast, sliced",
      "1 tbsp soy sauce",
      "1 tbsp sesame oil",
      "1 red bell pepper, sliced",
      "1 broccoli head, florets",
      "2 carrots, julienned",
      "2 cloves garlic, minced",
      "1 inch ginger, grated",
      "Rice or noodles, for serving",
    ],
    instructions:
      "Marinate chicken in soy sauce and sesame oil for 15 minutes. Heat oil in a wok or large pan. Stir-fry chicken until cooked through. Add garlic, ginger, and vegetables, cooking until tender-crisp. Serve immediately with rice or noodles.",
    images: ["https://example.com/images/stirfry1.jpg"],
    author: "60d0fe4f5311236168a109cb", // Example User ID
    isPublished: true,
    createdAt: "2024-02-20T14:30:00Z",
  },
  {
    title: "Vegetarian Lentil Soup",
    slug: "vegetarian-lentil-soup",
    tags: ["vegetarian", "soup", "healthy", "lunch"],
    ingredients: [
      "1 cup green lentils, rinsed",
      "1 onion, chopped",
      "2 carrots, diced",
      "2 celery stalks, diced",
      "1 can (400g) crushed tomatoes",
      "6 cups vegetable broth",
      "1 tsp cumin",
      "1/2 tsp turmeric",
      "Salt",
      "Pepper",
    ],
    instructions:
      "Sauté onion, carrots, and celery in a large pot until softened. Add rinsed lentils, crushed tomatoes, vegetable broth, cumin, and turmeric. Bring to a boil, then reduce heat and simmer for 30-40 minutes, or until lentils are tender. Season with salt and pepper to taste.",
    images: ["https://example.com/images/lentilsoup1.jpg"],
    author: "60d0fe4f5311236168a109cc", // Example User ID
    isPublished: true,
    createdAt: "2024-03-01T09:15:00Z",
  },
  {
    title: "Simple Pancakes",
    slug: "simple-pancakes",
    tags: ["breakfast", "sweet", "easy"],
    ingredients: [
      "1.5 cups all-purpose flour",
      "2 tbsp sugar",
      "2 tsp baking powder",
      "1/2 tsp salt",
      "1.25 cups milk",
      "1 large egg",
      "2 tbsp melted butter",
    ],
    instructions:
      "In a large bowl, whisk together flour, sugar, baking powder, and salt. In a separate bowl, whisk milk, egg, and melted butter. Pour the wet ingredients into the dry ingredients and mix until just combined (lumps are okay). Heat a lightly oiled griddle or frying pan over medium heat. Pour 1/4 cup of batter per pancake. Cook for 2-3 minutes per side, or until golden brown and cooked through.",
    images: ["https://example.com/images/pancakes1.jpg"],
    author: "60d0fe4f5311236168a109cd", // Example User ID
    isPublished: true,
    createdAt: "2024-03-10T08:00:00Z",
  },
  {
    title: "Homemade Pizza Margherita",
    slug: "homemade-pizza-margherita",
    tags: ["italian", "pizza", "vegetarian", "dinner"],
    ingredients: [
      "1 pre-made pizza dough",
      "1/2 cup tomato sauce",
      "200g fresh mozzarella, sliced",
      "Fresh basil leaves",
      "Olive oil",
      "Salt",
    ],
    instructions:
      "Preheat oven to 220°C (425°F). Roll out pizza dough on a floured surface. Spread tomato sauce evenly over the dough. Arrange mozzarella slices over the sauce. Bake for 12-15 minutes, or until crust is golden and cheese is bubbly. Garnish with fresh basil leaves and a drizzle of olive oil before serving.",
    images: ["https://example.com/images/pizza1.jpg"],
    author: "60d0fe4f5311236168a109ce", // Example User ID
    isPublished: true,
    createdAt: "2024-04-05T19:00:00Z",
  },
  {
    title: "Creamy Tomato Pasta",
    slug: "creamy-tomato-pasta",
    tags: ["pasta", "vegetarian", "easy", "dinner"],
    ingredients: [
      "300g pasta (e.g., penne, fusilli)",
      "1 tbsp olive oil",
      "1 onion, finely chopped",
      "2 cloves garlic, minced",
      "1 can (400g) crushed tomatoes",
      "1/2 cup heavy cream",
      "Fresh basil or parsley, for garnish",
      "Parmesan cheese, for serving",
      "Salt",
      "Pepper",
    ],
    instructions:
      "Cook pasta according to package directions. While pasta cooks, heat olive oil in a pan. Sauté onion until soft, then add garlic and cook for another minute. Stir in crushed tomatoes and simmer for 10 minutes. Reduce heat and stir in heavy cream. Drain pasta and add to the sauce, tossing to coat. Season with salt and pepper. Serve with fresh herbs and Parmesan.",
    images: ["https://example.com/images/creamy_pasta1.jpg"],
    author: "60d0fe4f5311236168a109cf", // Example User ID
    isPublished: true,
    createdAt: "2024-04-20T17:45:00Z",
  },
  {
    title: "Classic Guacamole",
    slug: "classic-guacamole",
    tags: ["appetizer", "mexican", "vegetarian", "dip"],
    ingredients: [
      "3 ripe avocados",
      "1/4 cup finely chopped red onion",
      "1-2 jalapeños, seeded and minced (optional)",
      "Juice of 1 lime",
      "2 tbsp chopped fresh cilantro",
      "Salt to taste",
    ],
    instructions:
      "Mash avocados in a bowl until desired consistency. Stir in red onion, jalapeños (if using), lime juice, and cilantro. Season with salt. Serve immediately with tortilla chips.",
    images: ["https://example.com/images/guacamole1.jpg"],
    author: "60d0fe4f5311236168a109d0", // Example User ID
    isPublished: true,
    createdAt: "2024-05-01T12:00:00Z",
  },
  {
    title: "Roasted Salmon with Asparagus",
    slug: "roasted-salmon-asparagus",
    tags: ["fish", "healthy", "dinner", "quick"],
    ingredients: [
      "2 salmon fillets",
      "1 bunch asparagus, trimmed",
      "1 tbsp olive oil",
      "1/2 lemon, sliced",
      "Salt",
      "Pepper",
    ],
    instructions:
      "Preheat oven to 200°C (400°F). Place salmon fillets and asparagus on a baking sheet. Drizzle with olive oil, season with salt and pepper. Place lemon slices on top of salmon. Roast for 12-15 minutes, or until salmon is cooked through and asparagus is tender-crisp.",
    images: ["https://example.com/images/salmon_asparagus1.jpg"],
    author: "60d0fe4f5311236168a109d1", // Example User ID
    isPublished: true,
    createdAt: "2024-05-15T18:30:00Z",
  },
  {
    title: "Chocolate Chip Cookies",
    slug: "chocolate-chip-cookies",
    tags: ["dessert", "baking", "sweet"],
    ingredients: [
      "1 cup unsalted butter, softened",
      "3/4 cup granulated sugar",
      "3/4 cup packed brown sugar",
      "2 large eggs",
      "1 tsp vanilla extract",
      "2 1/4 cups all-purpose flour",
      "1 tsp baking soda",
      "1/2 tsp salt",
      "2 cups chocolate chips",
    ],
    instructions:
      "Preheat oven to 190°C (375°F). In a large bowl, cream together softened butter, granulated sugar, and brown sugar until light and fluffy. Beat in eggs one at a time, then stir in vanilla extract. In a separate bowl, whisk together flour, baking soda, and salt. Gradually add dry ingredients to wet ingredients, mixing until just combined. Stir in chocolate chips. Drop rounded tablespoons of dough onto baking sheets. Bake for 9-11 minutes, or until edges are golden brown. Let cool on baking sheets for a few minutes before transferring to a wire rack to cool completely.",
    images: ["https://example.com/images/cookies1.jpg"],
    author: "60d0fe4f5311236168a109d2", // Example User ID
    isPublished: true,
    createdAt: "2024-06-01T11:00:00Z",
  },
  {
    title: "Caprese Salad",
    slug: "caprese-salad",
    tags: ["italian", "salad", "vegetarian", "appetizer"],
    ingredients: [
      "2 large ripe tomatoes, sliced",
      "200g fresh mozzarella cheese, sliced",
      "Fresh basil leaves",
      "Balsamic glaze (optional)",
      "Extra virgin olive oil",
      "Salt",
      "Black pepper",
    ],
    instructions:
      "Arrange alternating slices of tomato, mozzarella, and basil on a platter. Drizzle with extra virgin olive oil and balsamic glaze (if using). Season with salt and freshly ground black pepper.",
    images: ["https://example.com/images/caprese1.jpg"],
    author: "60d0fe4f5311236168a109d3", // Example User ID
    isPublished: true,
    createdAt: "2024-06-10T13:45:00Z",
  },
];

exports.recipes = recipes;

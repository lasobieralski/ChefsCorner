//ccrecipe.mjs page
// {
//     Author: [
//         " "
//     ],
//     name: " ",
//     tags: [" "],
//     //image: "./images/",
//     servings: " ",
//     prepTime: " ",
//     cookTime: " ",
//     ingredients: [
//         " ",
//         " ",
//         " "
//     ],
//     note: " ",
//     instructions: [
//         " ",
//         " ",
//         " ",
//     ]
// },
// {
//     Author: [
//         " "
//     ],
//     name: " ",
//     tags: [" "],
//     //image: "./images/",
//     servings: " ",
//     prepTime: " ",
//     cookTime: " ",
//     ingredients: [
//         " ",
//         " ",
//         " "
//     ],
//     note: " ",
//     instructions: [
//         " ",
//         " ",
//         " ",
//     ]
// },


const recipes = [
    {
        Author: [
            "The Mormon Diet by Earl F. Updike",
            "A Word of Wisdom",
            "14 Days to New Vigor and Health"
            ],
        name: "Hash Brown Potatoes",
        tags: ["Potatoes, Breakfast"],
        image: "./images/hashbrowns.jpg",
        servings: "1 (eat all you want)",
        prepTime: "3 minute",
        cookTime: "25 minutes",
        ingredients: [
            "1-2 fresh potatoes",
            "½ cup chopped onion",
            "1/8 teaspoon Mrs. Dash (optional)",
            "1 garlic clove crushed",
            "pepper to taste"
        ],
        note: "You can add herbs of choice for flavoring.",
        directions: [
            "Wash and grate potatoes.",
            "Cook in a nonstick skillet over medium heat for 6 minutes",
            "turn and cook for 6-10 minutes on the other side, until browned.",
            "Garnish with ketchup or other sauce (no-oil)."
        ]
    },
    {
        Author: [
            "The Mormon Diet by Earl F. Updike",
            "A Word of Wisdom",
            "14 Days to New Vigor and Health"
        ],
        name: ": Apple Pie Waffles or Pancakes",
        tags: ["Waffles, Pancakes, Breakfast"],
        image: "#",
        servings: "makes 14 pancakes or 4 waffles",
        prepTime: "30 minutes",
        cookTime: "20 minutes",
        ingredients: [
            "1 ¾ cups fine whole wheat flour",
            "1 teaspoon honey",
            "½ cup wheat bran",
            "1 cup low-fat soy milk or skim milk", 
            "2 teaspoons dry yeast", 
            "½ teaspoon salt (optional)", 
            "2 egg whites or 2 teaspoons egg replacer mixed with 4 tablespoons water",
            "1 teaspoon apple pie spice", 
            "2 apples grated", 
            "3 tablespoons applesauce", 
            "¾ cup warm water"
        ],
        note: "Remember to spray your waffle iron with a non-stick spray or lightly oil.",
        directions: [
            "Mix flour, bran, apple pie spice, and salt (optional); set aside. ",
            "Combine yeast, water, and honey, and let rest 5 minutes while grating peeled apple.",
            "Add the soy milk or skim milk, applesauce, egg whites or egg replacer, and grated apple to the yeast mixture.",
            "Mix well. Combine with the dry ingredients.",
            "Cover and let rest for 15 minutes.",
            "Pour about 1 cup of batter into a hot waffle iron (large waffle iron) and cook for 7-8 minutes, or until the lid lifts easily.", 
            "(If you have a small single size waffle iron adjust batter measurement according to the manufacturers direction.", 
            "I would start with ¼ - ½ cup of batter.", 
            "You do not want the batter to run over the sides of the waffle iron.)", 
            "For Pancakes: Ladle batter onto a medium-hot, nonstick griddle and flatten cakes so the center will cook.", 
            "Cook about 10 minutes on first side, about 6-8 minutes on the other side.", 
            "Don’t turn until bubbles form on top.", 
            "These cakes are thicker than regular pancakes and take longer to cook."
        ]
    },
    {
        Author: [
            "The Mormon Diet by Earl F. Updike",
            "A Word of Wisdom",
            "14 Days to New Vigor and Health"
        ],
        name: "Quick Blueberry Oatmeal",
        tags: ["Oatmeal, Breakfast"],
        image: "./images/blueberry_oatmeal.jpg",
        servings: "1",
        prepTime: "2 minutes",
        cookTime: "5 minutes",
        ingredients: [
            "½ cup regular oatmeal",
            "1 cup blueberries (fresh or frozen)",
            "1 cup water"
        ],
        note: "For larger or 2 servings double the recipe ingredients. Peaches, blueberries, blackberries and raspberries are my favorite.",
        directions: [
            "Place water in pot. Add oats, bring water to a boil, and stir. ",
            "Boil for 1 minute, stirring occasionally. ",
            "Cover pot, turn off heat, and remove from burner. ",
            "Wait 4 -5 minutes, stir, and serve.",
            "Eat plain, with fruit or with a little cinnamon or nutmeg.",
            "For a variety, add raisins or other dry fruits during or after cooking.",
            "(I have used frozen fruits like raspberries, blueberries, and blackberries and cooked a little longer.)"
        ],
    },
    {
        Author: [
            "The Mormon Diet by Earl F. Updike",
            "A Word of Wisdom",
            "14 Days to New Vigor and Health"
        ],
        name: "Cold or Hot Rice—Cereal—Fruit Combo",
        tags: ["Cereal, Rice, Breakfast"],
        image: "./images/cinnamon_rice_cereal.jpg",
        servings: "1",
        prepTime: "2-8 minutes",
        cookTime: "none if eaten cold or 1-2 minutes in microwave",
        ingredients: [
            "2/3 cup cooked rice",
            "fruit (raisins, bananas, berries, etc.)(optional)",
            "dash of cinnamon (optional)"
        ],
        note: "",
        directions: [
            "In a cereal bowl add rice",
            "Top with any fruit (raisins, bananas, berries, etc.)",
            "Add a dash of cinnamon. ",
            "For liquid you can use unsweetened apple juice, rice milk, soy milk, or skim milk.",
            "I have used unsweetened almond milk.",
            "I also prefer my rice cereal warmed in the microwave 1-2 minutes."
        ]
    },
    {
        Author: [
            "The Mormon Diet by Earl F. Updike",
            "A Word of Wisdom",
            "14 Days to New Vigor and Health"
        ],
        name: "Cold Cereal",
        tags: ["Cereal, Breakfast"],
        image: "./images/grapenuts_blueberries.jpg",
        servings: "1",
        prepTime: "2 minutes",
        cookTime: "none",
        ingredients: [
            "1-3 cups of shredded Wheat or Grape-Nuts or other acceptable cold cereal",
            "¼ cup unsweetened fruit juice, soy milk or rice milk (optional)",
            "½ banana",
            "¼ cup strawberries (optional)"
        ],
        note: "I like mine with fresh blueberries and unsweetened Almond Milk",
        directions: [
            "Pour the cereal into a bowl.",
            "Add the juice.",
            "Add milk (optional).",
            "Top with fruit if desired."
        ]
    },
    {
        Author: [
            "The Mormon Diet by Earl F. Updike",
            "A Word of Wisdom",
            "14 Days to New Vigor and Health"
        ],
        name: "Wheatena Whole Wheat Hot Cereal",
        tags: ["Cereal, Whole Wheat, Breakfast"],
        //image:
        servings: "1",
        prepTime: "1 minute",
        cookTime: "3-5 minutes",
        ingredients: [
            "½ cup Wheatena",
            "1 ½ cups water"
        ],
        note: "Microwave instructions are on the box.",
        directions: [
            "Place Wheatena and water into a saucepan and heat to a rapid boil, stirring occasionally.",
            "Cook 4-5 minutes over moderate heat or to desire consistency, stirring occasionally.",
            "Remove from heat; cover until ready to serve.",
            "Stir before serving. ",
            "Top off with an orange or banana. (optional)",
            "(I like fresh raspberries.)"
        ]
    },
    {
        Author: [
            "Amy Allen Johnson"
        ],
        name: "Slow Cooker Cracked Wheat Cereal",
        tags: ["Cereal, Whole Wheat, Breakfast"],
        image:"./images/crackedwheatcereal.jpg",
        servings: "4 -- 1/2 cup serving size",
        prepTime: "",
        cookTime: "",
        ingredients: [
            "white wheat berries (uncooked wheat grain)",
            "water",
            "pinch of salt (optional)"
        ],
        note: "Toppings you can add milk brown sugar, honey, raisins, yogurt, fruit (I add fresh berries and plain greek yogurt).",
        directions: [
            "Plan your meal using a 1/2 cup cooked wheat as your serving size.",
            "Similar to rice, 1 cup of uncooked wheat will yield 4, 1/2-cup servings.",
            "Typlical water to wheat ratio is 3 to 1. For 4 servings, add 1 cup raw wheat to 3 cups of water in a slow cooker.",
            "Add a pinch of salt and cover.",
            "Cook on low for up 8-10 hours or overnight.",
            "Cereal will have puffed up and absorbed the majority ofthe water and cracked open to reveal buffy white insides of the wheat.",
            "If you prefer a firmer cereal, reduce the cooking time to 7-8 hours. I like my cereal soft but still squeky to chew."
        ]
    },
    {
        Author: [
            "Lisaann Sobieralski",
        ],
        name: "Turkey Vegetable Soup",
        tags: ["Soup, Turkey, Vegetable, Lunch, Dinner"],
        image: "./images/turkeyvegsoup.jpg",
        servings: "8-10",
        prepTime: "15 minutes",
        cookTime: "slow cooker 4-8 hours depending on level",
        ingredients: [
            "half gallon jar of soup base broth(8 cups)",
            "4-5 potatoes (I used yellow and white potatoes",
            "5-6 sliced carrots",
            "1 bunch of celery chopped",
            "2 yellow onions diced",
            "2 cups of turkey cut up"
        ],
        note: "I used the drippings from my cooked turkey and made some gravy to use as my broth.",
        directions: [
            "Place all ingredients into slow cooker and cook to desired doneness."
                
        ]
    },
    {
        Author: [
            "Lisaann Sobieralski",
        ],
        name: "Tuna Pita",
        tags: ["Lunch, Tuna, Sandwich"],
        image: "./images/pitatunasalad.jpg",
        servings: "5-6",
        prepTime: "5-10 minutes",
        cookTime: "none",
        ingredients: [
            "1 can tuna drained",
            "3/4 cup miracle whip salad dressing (mayo, sourcream, plain greek yogurt, or sauce of choice)",
            "1/2 whole dill pickle diced",
            "1/4 onion diced",
            "2 boiled eggs diced",
            "1/2 cup of grapes sliced or diced",
            "alfalfa sprouts (optional)",
            "brocoli slaw (optional)",
            "whole wheat pita bread"
        ],
        note: "I use tuna packed in water",
        directions: [
            "Mix all ingredients into a bowl.",
            "Place about 1/2 cup mixed salad in pita pocket."
        ]
    },
    {
        Author: [
            "The Mormon Diet by Earl F. Updike",
            "A Word of Wisdom",
            "14 Days to New Vigor and Health"
        ],
        name: "Lettuce, Tomato, Onion, and Cucumber Sandwich",
        tags: ["Lunch, Sandwich"],
        //image:
        servings: "1",
        prepTime: "",
        cookTime: "none",
        ingredients: [
            "2 slices whole wheat bread",
            "1 sliced tomato",
            "1 sliced onion",
            "black pepper, Mrs. Dash",
            "lettuce leaves",
            "sliced cucumbers",
            "dressing (oil-free and low-sodium)",
            "sliced pickles (optional)"
        ],
        note: "",
        directions: [
            "Toast bread if desired.",
            "Spread dressing on bread.",
            "Layer tomatoes, onion, cucumbers on one slice of bread.",
            "Cover with lettuce.",
            "Spice with a little Dijon mustard if desired.",
            ""
        ]
    },
    {
        Author: [
            "The Mormon Diet by Earl F. Updike",
            "A Word of Wisdom",
            "14 Days to New Vigor and Health"
        ],
        name: "Fantastic Spaghetti Sauce",
        tags: ["Dinner, Spaghetti, Pasta"],
        image:"./images/spaghetti.jpg",
        servings: "10-12",
        prepTime: "15 minutes",
        cookTime: "1 1/2 hours",
        ingredients: [
            "2 cans (28 oz.) tomatoes, slightly chopped",
            "2 cans (29 oz.) tomato sauce",
            "3 cups chopped onion",
            "2 cups chopped bell pepper",
            "5-6 cups sliced mushrooms",
            "1 tablespoon garlic, minced",
            "2 tablespoon white vinegar",
            "2 tablespoons basil",
            "2 teaspoons Mrs. Dash mixed spices and herbs"
        ],
        note: "",
        directions: [
            "Combine all ingredients, except basil, in a large saucepan or skillet.",
            "Simmer about one hour; add basil and simmer 30 minutes longer.",
            "You can make the sauce early in the day and reheat just before serving.",
            "15 minutes before serving, drop 1 pound of egg-free whole wheat or spinach spaghetti into 4 quarts of water.",
            "Cook until tender or about 10 minutes. Serve with sauce.",
            "Freeze leftover sauce for future use."
        ]
    },
    {
        Author: [
            "The Mormon Diet by Earl F. Updike",
            "A Word of Wisdom",
            "14 Days to New Vigor and Health"
        ],
        name: "Spice Cake",
        tags: ["Dessert, Cake"],
        image:"./images/spicecake.jpg",
        servings: "9-16",
        prepTime: "",
        cookTime: "30-45 minutes",
        ingredients: [
            "1/2 cup brown sugar",
            "1 cup whole wheat flour",
            "1 cup white flour",
            "1/4 teaspoon baking soda",
            "3 teaspoons baking powder",
            "1 teaspoon cinnamon",
            "1/4 teaspoon cloves",
            "1/2 teaspoon nutmeg",
            "1/2 cup applesauce (unsweetened)",
            "1 cup raisins",
            "1/2 cup chopped dates (optional)",
            "3 teaspoons egg replacer or 2 egg whites"
        ],
        note: "",
        directions: [
            "Mix all ingredients together.",
            "Bake in 8 x 8 non-stick pan at 350* for 30 - 45 minutes, or until a toothpick comes out clean.",
            "You can make the sauce early in the day and reheat just before serving.",
            "15 minutes before serving, drop 1 pound of egg-free whole wheat or spinach spaghetti into 4 quarts of water.",
            "Cook until tender or about 10 minutes. Serve with sauce.",
            "Freeze leftover sauce for future use."
        ]
    },
    {
            Author: [
                "Virta",
                "",
                ""
            ],
            name: "Holiday Chocolate Mousse",
            tags: ["Dessert, Mousse"],
            image:"./images/holidaychocmousse.jpg",
            servings: "1",
            prepTime: "3 min",
            cookTime: "none",
            ingredients: [
                "1/2 cup plain, whole-milk Greek Yogurt",
                "1 tablespoon Organic Cacao Powder",
                "2 teaspoons water",
                "3-4 raspberries (optional)",
                "sliced strawberry (optional)",
                "1 oz chopped pecans or other nuts (optional)"
                
            ],
            note: "",
            directions: [
                "Add yogurt, cacao powder, and water into a small bowl.",
                "Stir to combine.",
                "Add topping of your choice and enjoy!"
                
            ]
        },
            {
        Author: [
            "Virta"
        ],
        name: "Broccoli Cheddar Soup",
        tags: ["Lunch, Dinner, Soup"],
        image:"./images/broccolicheddarsoup.jpg",
        servings: "12",
        prepTime: "15 minutes",
        cookTime: "30 minutes",
        ingredients: [
            "3 heads Broccoli steamed and cut into florets (about 6 cups)",
            "8 oz cream cheese",
            "2 teaspoons water",
            "4 teaspoons chicken bouillon or vegetable bouillon",
            "16 oz shredded cheddar cheese",
            "1 tsp xanthan gum",
            "pepper to taste",
            "bacon crumbles (optional)",
            "",
            "",
            "",
            ""
        ],
        note: "",
        directions: [
            "Combine half of the steamed broccoli, cream cheese, heavy cream, and 1/2 cup of water into a food processor or blender; process until smooth.",
            "Transfer mixture into large pot.",
            "Whisk in bouillon, pepper(to taste), and 1 cup water.",
            "Slowly add in xanthan gum and whisk.",
            "Bring to a boil, then simmer for 5 minutes.",
            "Stir in cheddar cheese.",
            "Gently stir in remaining broccoli florets.",
            "Let rest 5-10 minutes, then garnish with bacon crumbles (optional)."
            ]
        },
    {
        Author: [
            "Lisaann Sobieralski"
        ],
        name: "Deviled Eggs",
        tags: ["Lunch, Dinner, Breakfast"],
        image:"./images/deviledeggs.jpg",
        servings: "12",
        prepTime: "10 minutes",
        cookTime: "20 minutes",
        ingredients: [
            "12 hard boiled eggs",
            "1/2 cup mayonnaise",
            "2 teaspoons white vinegar",
            "2 teaspoons Dijon Mustard",
            "1/8 teaspoon salt",
            "1/2 teaspoon black pepper",
            "paprika for garnish",
            "diced onion",
            "diced pickles",
            "",
            "",
            ""
        ],
        note: "",
        directions: [
            "Peel eggs carefully under cold running water.",
            "Dry eggs before slicing",
            "Slice the eggs in half, remove the yolds and place in a medium sized bowl.",
            "Place whites on a serving dish or plate",
            "Mash yolks with a fork. Add mayo, vinegar, mustard, salt and pepper.",
            "Mix until combined and creamy.",
        "Spoon mixture into egg whites.",
        "Sprinkle with truffled salt or paprika to serve."
            ]
    },
    {
        Author: [
            "Virta"
        ],
        name: "Burgoo Stew",
        tags: ["Lunch, Dinner, Stew, Soup"],
        image:"./images/burgoostew.jpg",
        servings: "12",
        prepTime: "10 minutes",
        cookTime: "8 minutes",
        ingredients: [
            "2 lbs beef roast",
            "2 lbs chicken breast",
            "2 lbs pork roast",
            "3 cups beef broth",
            "2 cups crushed tomatoes",
            "1 medium onion chopped",
            "4 stalks celery chopped",
            "1/2 cup worcestershire sauce",
            "2 1/2 cups turnips",
            "1 cup okra",
            " 1 teaspoon Garlic Powder",
            "2 teaspoon salt",
            "2 teaspoon pepper"
        ],
        note: "",
        directions: [
            "Wash and chop all vegetables.",
            "Add all ingredients to a slow cooker and cook on low 7-8 hours until meat is cooked through and tender.",
            "Add extra salt and pepper if desired and enjoy!"
            
        ]
    },
    {
        Author: [
            "Tasty Freedom 2 Cookbook recipe created by Laurie Lundgren"
        ],
        name: "Banana Bread",
        tags: ["Breakfast, Lunch, Bread"],
        image:"./images/banana_bread.jpg",
        servings: "4",
        prepTime: "10 minutes",
        cookTime: "33-35 minutes",
        ingredients: [
            "24 oz bananas, over-ripe, mashed (approx. 6-7 bananas)",
            "1 teaspoon dehydreated orange peel (optional)",
            "4 eggs",
            "2 teaspoons vanilla extract",
            "4 oz peanut butter, no added sugar (or 4 oz walnuts crushed/chopped)",
            "4 oz oats, old fashioned or quick oats, uncooked",
            "1/2 teaspoon salt",
            "1 teaspoon baking powder",
            "1 teaspoon baking soda",
            "1 1/4 teasponns cinnamon"
        ],
        note: "Enjoy cold, room temperature, or warmed up!",
        directions: [
            "Pre-heat oven to 350°.",
            "Use 4 small casserole dishes as shown in picture (approx. 5 in. x 7.5 in.). Coaat dish with butter-flavored non-stick cooking spray. Or use 6 in. round cake pans. (I do not recommend using mini loaf pans as they are too deep for the batter to cook thoroughly.)",
            "In a large mixing bowl, mash the bananas with a potato masher. Add dehydrated orange peel, eggs, and vanilla extract. Stir. Add peanut butter (or nuts). Stir until thoroughly combined.",
            "In a smaller separate bowl, combine dry ingredients: oats, salt, baking powder, backing sods, and cinnamon. Stir. Add this mixture of dry ingredients to the contents of the first large mixing bowl. Stir to forom a batter.",
            "Equally distribute the batter among 4 casserole dishes by scooping only one ladleful per casserole dish at a time. Repeat until all batter is equally distributed into the four casserole dishes.",
            "Bake (all four at once) at 350° for 33-35 minutes. Let cool.",
            "Tip: For best texture and taste, refrigerate for at least 1 hour or overnight before serving. Cover and store in the refrigerator for up to 5 days.",
            "Freezing Tip: to freeze, store in quart-sized Ziploc freezer bags. For a quick and easy breakfast, thaw overnight in the refrigerator or out on the kitchen counter."
        ]
    },
];
    
export default recipes;
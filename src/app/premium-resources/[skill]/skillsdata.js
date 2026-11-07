// src/app/premium-resources/[skill]/skillsData.js

export const SKILLS_DATA = {
  javascript: {
    title: 'JavaScript for Absolute Beginners',
    category: 'Web Programming',
    level: 'Zero to Intermediate',
    estimatedHours: '12 Hours',
    overview:
      'Never written a line of JavaScript before? Start here. Learn how websites think, store information in variables, make decisions with if/else, repeat tasks with loops, and make web pages interactive step by step.',
    cheatSheet: [
      { concept: 'Print to Screen', syntax: 'console.log("Hello!");', keyRule: 'Displays any text or number inside the output console.' },
      { concept: 'Changeable Variable', syntax: 'let score = 10;', keyRule: 'Use "let" when the value stored inside might change later.' },
      { concept: 'Fixed Constant', syntax: 'const pi = 3.14;', keyRule: 'Use "const" when the value should never be overwritten.' },
      { concept: 'Decision (If / Else)', syntax: 'if (age >= 18) { ... }', keyRule: 'Runs the block of code only when the condition inside () is true.' },
      { concept: 'Function (Reusable Task)', syntax: 'function greet() { ... }', keyRule: 'Groups lines of code together so you can run them whenever you want.' },
    ],
    modules: [
      {
        id: 'js-1-variables',
        title: '1. Variables & Data Types (Storing Information)',
        duration: '15 mins',
        concept: `Think of a variable like a labeled storage box in your room. Instead of remembering a raw value like 95 or "Abhay" everywhere in your program, you put it inside a box and stick a label on it (like studentName or marks).

In modern JavaScript, we create variables using two simple words:
• let: Use this when the value inside the box can change later (like a game score or your age).
• const: Short for "constant". Use this when the value should never change (like your date of birth).

JavaScript mostly works with three basic types of data: Text (called Strings, always wrapped in quotes like "Hello"), Numbers (like 25 or 99.5), and Booleans (simple true or false switches).`,
        whyItMatters:
          'Every single app—from Instagram to Amazon—uses variables to hold your username, cart total, and login status.',
        codeTitle: 'step1-variables.js',
        code: `// 1. Storing text (String) inside a constant box
const studentName = "Aarav";

// 2. Storing a number inside a changeable box
let semesterMarks = 85;

// 3. Updating the value inside 'semesterMarks' (don't write 'let' again!)
semesterMarks = 92;

// 4. Printing our results to the screen
console.log("Student:", studentName);
console.log("Updated Marks:", semesterMarks);`,
        output: `Student: Aarav
Updated Marks: 92`,
        lineByLine: [
          'const studentName = "Aarav"; — Creates a fixed box named studentName and stores the text "Aarav" inside it.',
          'let semesterMarks = 85; — Creates a changeable box named semesterMarks and starts it at 85.',
          'semesterMarks = 92; — Replaces the old 85 with 92.',
          'console.log(...); — Prints whatever is inside the parentheses onto the terminal screen.',
        ],
        pitfalls: [
          'Forgetting quotes around text: Writing let name = Aarav; without quotes makes JavaScript think Aarav is another variable name instead of text!',
          'Trying to change a const variable later in the code—JavaScript will stop and show a TypeError.',
        ],
        challenge:
          'Create a variable named price set to 100, and another variable named tax set to 18. Print their sum using console.log().',
        solution: `let price = 100;
let tax = 18;
console.log(price + tax); // Prints 118`,
      },
      {
        id: 'js-2-conditions',
        title: '2. Making Decisions with If / Else',
        duration: '20 mins',
        concept: `Programs need to make decisions just like humans do. In real life, you think: "IF it is raining outside, I will take an umbrella; ELSE, I will wear sunglasses."

JavaScript uses the exact same words: if and else. You put a condition inside parentheses ( ). If that condition is true, JavaScript runs the first block of code inside { }. If it is false, it skips to the else block.

To compare two values, we use comparison symbols:
• > (Greater than) and < (Less than)
• >= (Greater than or equal to)
• === (Checks if two things are strictly equal)`,
        whyItMatters:
          'Used everywhere: checking if a user entered the right password, if an exam score is passing, or if a cart qualifies for free delivery.',
        codeTitle: 'step2-decisions.js',
        code: `let marks = 75;
let passingMarks = 40;

if (marks >= passingMarks) {
  console.log("Congratulations! You passed the exam.");
} else {
  console.log("Keep practicing! Try again next time.");
}`,
        output: `Congratulations! You passed the exam.`,
        lineByLine: [
          'let marks = 75; — Sets the student score to 75.',
          'if (marks >= passingMarks) — Asks JavaScript: "Is 75 greater than or equal to 40?" Since yes (true), it enters the first { } block.',
          'else { ... } — This block is ignored because the "if" condition was already true.',
        ],
        pitfalls: [
          'Using a single = instead of === inside an if condition. A single = assigns a value; === compares two values!',
        ],
        challenge:
          'Write an if/else check for a variable temperature = 38. If temperature is greater than 35, print "It is hot outside", otherwise print "Nice weather".',
        solution: `let temperature = 38;

if (temperature > 35) {
  console.log("It is hot outside");
} else {
  console.log("Nice weather");
}`,
      },
      {
        id: 'js-3-loops',
        title: '3. Repeating Tasks Automatically with Loops',
        duration: '20 mins',
        concept: `Imagine your teacher asks you to print "Hello Student" 5 times. Writing console.log() 5 separate times is tiring—and what if you needed to print it 1,000 times?

A Loop lets you write a line of code once and tells the computer how many times to repeat it automatically. The most common loop is the "for loop", which has 3 simple parts inside its parentheses:
1. Start: Where do we start counting? (let i = 1)
2. Stop Condition: Keep going as long as this is true (i <= 5)
3. Step: Add 1 after every round (i++)`,
        whyItMatters:
          'Whenever you see a feed of 50 posts on Instagram or 20 products on Flipkart, a loop is displaying them one by one.',
        codeTitle: 'step3-for-loop.js',
        code: `// Count from 1 to 4 automatically
for (let count = 1; count <= 4; count++) {
  console.log("Printing Roll Number:", count);
}

console.log("Loop finished!");`,
        output: `Printing Roll Number: 1
Printing Roll Number: 2
Printing Roll Number: 3
Printing Roll Number: 4
Loop finished!`,
        lineByLine: [
          'let count = 1; — Starts our counter variable at 1.',
          'count <= 4; — Tells the loop to keep repeating as long as count is 4 or less.',
          'count++ — Shortcut for "add 1 to count" at the end of each round.',
          'console.log(...) — Runs 4 times in a row with count changing from 1 to 4.',
        ],
        pitfalls: [
          'Creating an infinite loop by writing a condition that never becomes false (like count >= 1 when adding 1 each time).',
        ],
        challenge:
          'Write a for loop that prints the numbers 2, 4, 6, 8, 10 (Hint: increase your counter by 2 each step using i = i + 2).',
        solution: `for (let i = 2; i <= 10; i = i + 2) {
  console.log(i);
}`,
      },
      {
        id: 'js-4-functions',
        title: '4. Writing Reusable Functions',
        duration: '25 mins',
        concept: `A Function is like a kitchen blender or a coffee machine. You build the machine once, give it some ingredients (called inputs or parameters), press start, and it gives you back a finished result (return value).

Instead of copying and pasting the same calculation in 10 different places in your code, you wrap it inside a function and give it a descriptive name like calculateTotal() or greetUser().`,
        whyItMatters:
          'Functions keep your code clean, organized, and easy to fix. Every button click on a website triggers a function.',
        codeTitle: 'step4-functions.js',
        code: `// 1. Define the function (Building the machine)
function addTwoNumbers(firstNum, secondNum) {
  let sum = firstNum + secondNum;
  return sum;
}

// 2. Call/Use the function as many times as we want!
let result1 = addTwoNumbers(10, 25);
let result2 = addTwoNumbers(100, 50);

console.log("First sum:", result1);
console.log("Second sum:", result2);`,
        output: `First sum: 35
Second sum: 150`,
        lineByLine: [
          'function addTwoNumbers(firstNum, secondNum) — Creates a function that accepts two inputs.',
          'let sum = firstNum + secondNum; — Adds the two inputs together.',
          'return sum; — Sends the final answer back out of the function.',
          'addTwoNumbers(10, 25); — Runs the function with 10 and 25, giving back 35.',
        ],
        pitfalls: [
          'Writing a function but forgetting to call it with parentheses ()—a function does nothing until you call it!',
        ],
        challenge:
          'Create a function named square(num) that multiplies a number by itself and returns the answer.',
        solution: `function square(num) {
  return num * num;
}

console.log(square(6)); // Prints 36`,
      },
      {
        id: 'js-5-arrays',
        title: '5. Lists of Data (Arrays)',
        duration: '20 mins',
        concept: `What if you want to store a list of 5 subjects? Creating subject1, subject2, subject3 is messy. Instead, JavaScript gives you an Array—a single ordered list wrapped in square brackets [ ].

One golden rule in programming: Arrays start counting positions (called indexes) from 0, not 1! So the first item is at position [0], the second item is at position [1], and so on.`,
        whyItMatters:
          'Shopping carts, todo lists, playlists, and search results are all stored as arrays.',
        codeTitle: 'step5-arrays.js',
        code: `// Creating an array of subjects
let subjects = ["Maths", "Physics", "Coding"];

// Accessing items by their position (starts at 0!)
console.log("First subject:", subjects[0]);
console.log("Third subject:", subjects[2]);

// Adding a new item to the end of the list
subjects.push("Electronics");
console.log("Total subjects now:", subjects.length);`,
        output: `First subject: Maths
Third subject: Coding
Total subjects now: 4`,
        lineByLine: [
          'let subjects = ["Maths", ...]; — Stores 3 items in a single list.',
          'subjects[0] — Grabs the very first item ("Maths").',
          'subjects.push("Electronics") — Attaches a new item to the end of the list.',
          'subjects.length — Tells you how many total items are currently in the list (4).',
        ],
        pitfalls: [
          'Using [1] when you want the first item—remember index [0] is always first!',
        ],
        challenge:
          'Create an array named colors with 3 color names, and print the second color in the list.',
        solution: `let colors = ["Red", "Blue", "Green"];
console.log(colors[1]); // Prints Blue`,
      },
    ],
    faqs: [
      {
        q: 'Do I need to install anything on my laptop to practice JavaScript?',
        a: 'No! Every web browser (like Chrome or Edge) has a built-in JavaScript engine. You can press Right Click -> Inspect -> Console on any webpage and type JavaScript directly, or use our free interactive labs.',
      },
      {
        q: 'Is JavaScript the same thing as Java?',
        a: 'Not at all! Despite the similar name, Java and JavaScript are completely different languages. JavaScript was built to make websites interactive and is much easier for beginners to start with.',
      },
    ],
  },

  react: {
    title: 'React.js for Beginners',
    category: 'Frontend Web Development',
    level: 'Beginner Friendly',
    estimatedHours: '14 Hours',
    overview:
      'Learn how modern websites like Netflix and Instagram are built using reusable LEGO-like blocks called Components. Master JSX, Props, and interactive State from scratch.',
    cheatSheet: [
      { concept: 'Component', syntax: 'function MyButton() { return <button>Click</button>; }', keyRule: 'A reusable UI building block; function name must start with a Capital letter.' },
      { concept: 'JSX Curlys { }', syntax: '<h1>Hello {userName}</h1>', keyRule: 'Use curly braces { } inside HTML tags to insert JavaScript variables.' },
      { concept: 'Props (Inputs)', syntax: '<Card title="Notes" />', keyRule: 'Passes custom text or data from a parent component down to a child component.' },
      { concept: 'useState (Memory)', syntax: 'const [count, setCount] = useState(0);', keyRule: 'Updates the screen automatically whenever you call setCount().' },
    ],
    modules: [
      {
        id: 'react-1-components',
        title: '1. What is a Component & JSX?',
        duration: '15 mins',
        concept: `In traditional HTML, if you have a navigation bar or a course card on 10 pages, you have to copy-paste that HTML 10 times. React solves this with Components.

Think of a React Component like a custom LEGO brick. You write a simple JavaScript function whose name starts with a Capital Letter (like WelcomeCard), and return HTML-like tags (called JSX) from it. Once created, you can reuse <WelcomeCard /> anywhere on your website!`,
        whyItMatters:
          'Every element you see on modern web apps—buttons, navbars, profile cards—is a React component.',
        codeTitle: 'WelcomeCard.jsx',
        code: `// 1. Create a simple component (Name starts with Capital W)
function WelcomeCard() {
  const siteName = "Notiya";

  return (
    <div className="card">
      <h2>Welcome to {siteName}!</h2>
      <p>Start learning step by step.</p>
    </div>
  );
}

export default WelcomeCard;`,
        output: `[Renders on Screen]:
Welcome to Notiya!
Start learning step by step.`,
        lineByLine: [
          'function WelcomeCard() — Defines our reusable UI block.',
          'const siteName = "Notiya"; — Regular JavaScript variable holding text.',
          'return ( ... ) — Sends back the HTML layout to display on screen.',
          '{siteName} — Curly braces tell React: "Put the value of the siteName variable right here!"',
        ],
        pitfalls: [
          'Naming a component with a lowercase letter (like function welcomeCard). React treats lowercase names as plain HTML tags and won’t render your component!',
          'Returning two separate tags side-by-side without wrapping them inside one parent <div> or <>...</>.',
        ],
        challenge:
          'Create a component named StudentBadge that stores a variable branch = "ECE" and displays <p>Branch: {branch}</p>.',
        solution: `function StudentBadge() {
  const branch = "ECE";
  return <p>Branch: {branch}</p>;
}`,
      },
      {
        id: 'react-2-props',
        title: '2. Passing Data with Props',
        duration: '20 mins',
        concept: `If we reuse the same <CourseCard /> 3 times on a page, we don't want all 3 cards to show the exact same title! We want Card 1 to say "JavaScript", Card 2 to say "Python", and Card 3 to say "C++".

Props (short for Properties) let you pass custom values into a component—just like passing arguments into a function.`,
        whyItMatters:
          'Props allow one single card design to display hundreds of different products, courses, or user profiles.',
        codeTitle: 'CourseCardProps.jsx',
        code: `// 1. Child component receives 'props'
function CourseCard(props) {
  return (
    <div className="box">
      <h3>Course: {props.title}</h3>
      <p>Level: {props.level}</p>
    </div>
  );
}

// 2. Parent component reuses CourseCard with different data!
export default function App() {
  return (
    <div>
      <CourseCard title="JavaScript" level="Beginner" />
      <CourseCard title="React.js" level="Intermediate" />
    </div>
  );
}`,
        output: `[Renders Two Cards]:
Course: JavaScript | Level: Beginner
Course: React.js   | Level: Intermediate`,
        lineByLine: [
          'function CourseCard(props) — Receives an object containing all attributes passed to it.',
          '{props.title} — Displays whichever title was passed in.',
          '<CourseCard title="JavaScript" ... /> — Passes "JavaScript" into the component.',
        ],
        pitfalls: [
          'Trying to change props inside the child component (e.g., props.title = "New"). Props are read-only!',
        ],
        challenge:
          'Pass a price="Free" prop to <CourseCard /> and display it inside a <span> tag.',
        solution: `// Inside CourseCard:
<span>{props.price}</span>

// Usage:
<CourseCard title="HTML" level="Beginner" price="Free" />`,
      },
      {
        id: 'react-3-usestate',
        title: '3. Making Pages Interactive with useState',
        duration: '25 mins',
        concept: `If you change a normal JavaScript variable (like let likes = 0; likes = 1;), React does not know it changed, so the number on the screen stays stuck at 0!

To make the screen update automatically when a user clicks a button, we use React's special memory hook called useState. It gives us two things in an array:
1. The current value (e.g., count)
2. A special function to update that value and refresh the screen (e.g., setCount)`,
        whyItMatters:
          'Every counter, dark-mode toggle, shopping cart badge, and popup modal uses useState.',
        codeTitle: 'LikeButton.jsx',
        code: `import { useState } from "react";

export default function LikeCounter() {
  // Start 'likes' at 0
  const [likes, setLikes] = useState(0);

  function handleLike() {
    setLikes(likes + 1); // Adds 1 and refreshes screen!
  }

  return (
    <div>
      <p>Total Likes: {likes}</p>
      <button onClick={handleLike}>👍 Like Post</button>
    </div>
  );
}`,
        output: `[Initial Screen]: Total Likes: 0  [👍 Like Post]
[After 1 Click]:  Total Likes: 1  [👍 Like Post]`,
        lineByLine: [
          'const [likes, setLikes] = useState(0); — Creates a state variable starting at 0.',
          'setLikes(likes + 1); — Updates likes to 1 and tells React to redraw the screen.',
          'onClick={handleLike} — Runs handleLike whenever the user clicks the button.',
        ],
        pitfalls: [
          'Writing onClick={handleLike()} with parentheses inside JSX—that runs the function immediately before the user even clicks! Always write onClick={handleLike}.',
        ],
        challenge:
          'Add a second button labeled "Reset" that sets likes back to 0 when clicked.',
        solution: `<button onClick={() => setLikes(0)}>Reset</button>`,
      },
    ],
    faqs: [
      {
        q: 'What should I know before learning React?',
        a: 'Just basic HTML tags and the 5 beginner JavaScript concepts (variables, if/else, functions, and arrays). You do not need to be an expert to build your first React app.',
      },
    ],
  },

  cpp: {
    title: 'C++ Programming from Scratch',
    category: 'Core Programming',
    level: 'Absolute Beginner',
    estimatedHours: '15 Hours',
    overview:
      'Start your coding journey with C++. Learn how to write your first program, take user input, use variables, loops, arrays, and build a rock-solid foundation for Data Structures.',
    cheatSheet: [
      { concept: 'Print Output', syntax: 'cout << "Hello";', keyRule: 'Sends text or numbers to the console screen.' },
      { concept: 'Take User Input', syntax: 'cin >> age;', keyRule: 'Reads a value typed by the user on the keyboard.' },
      { concept: 'Integer Variable', syntax: 'int score = 100;', keyRule: 'Stores whole numbers without decimals.' },
      { concept: 'New Line', syntax: 'cout << endl;', keyRule: 'Moves the cursor to the next line in the terminal.' },
    ],
    modules: [
      {
        id: 'cpp-1-hello-world',
        title: '1. Your First C++ Program & Variables',
        duration: '15 mins',
        concept: `C++ is one of the fastest and most popular languages taught in engineering colleges and coding interviews. Every C++ program starts executing from a special function called main().

To print text on the screen, we include the <iostream> (Input/Output Stream) library at the top of the file and use cout << (pronounced "see-out"). Unlike JavaScript, in C++ you tell the computer what type of data a box holds right when you create it:
• int for whole numbers (like 20, -5)
• double for decimal numbers (like 9.81)
• string for text (like "Abhay")`,
        whyItMatters:
          'Understanding types and main() is the first step in every C, C++, and Java lab exam.',
        codeTitle: 'first-program.cpp',
        code: `#include <iostream>
using namespace std;

int main() {
    // Creating variables with specific types
    int rollNumber = 101;
    double cgpa = 8.9;

    // Printing values to the terminal
    cout << "Student Roll No: " << rollNumber << endl;
    cout << "Current CGPA: " << cgpa << endl;

    return 0;
}`,
        output: `Student Roll No: 101
Current CGPA: 8.9`,
        lineByLine: [
          '#include <iostream> — Loads the tool that lets us print to the screen.',
          'int main() { ... } — The starting door where your C++ program begins running.',
          'int rollNumber = 101; — Creates an integer (whole number) box holding 101.',
          'cout << ... << endl; — Prints the text and number, then moves to a new line.',
          'return 0; — Tells the operating system that the program finished successfully.',
        ],
        pitfalls: [
          'Forgetting the semicolon (;) at the end of a statement—C++ requires a semicolon at the end of every instruction line!',
        ],
        challenge:
          'Create an int variable named year set to 2026 and print "Year: 2026" using cout.',
        solution: `int year = 2026;
cout << "Year: " << year << endl;`,
      },
      {
        id: 'cpp-2-input-decisions',
        title: '2. Taking Input (cin) & If/Else Conditions',
        duration: '20 mins',
        concept: `Printing fixed numbers is nice, but real programs interact with the user! In C++, we use cin >> (pronounced "see-in") to read whatever the user types on their keyboard and store it inside a variable.

Notice the direction of the arrows:
• cout << points outwards to the screen.
• cin >> points inwards into your variable box.`,
        whyItMatters:
          'Every coding problem on HackerRank, LeetCode, or college practical exams requires reading test cases using cin.',
        codeTitle: 'even-or-odd.cpp',
        code: `#include <iostream>
using namespace std;

int main() {
    int number = 14; // Example input number

    // % (Modulo) gives the remainder after division by 2
    if (number % 2 == 0) {
        cout << number << " is an Even number." << endl;
    } else {
        cout << number << " is an Odd number." << endl;
    }

    return 0;
}`,
        output: `14 is an Even number.`,
        lineByLine: [
          'number % 2 == 0 — Divides number by 2 and checks if the remainder is 0.',
          'cout << number << " is an Even number."; — Prints when remainder is zero.',
        ],
        pitfalls: [
          'Mixing up << and >> arrows between cout and cin.',
        ],
        challenge:
          'Write an if/else statement in C++ that checks if an int marks = 85 is greater than or equal to 33, and prints "Pass" or "Fail".',
        solution: `int marks = 85;
if (marks >= 33) {
    cout << "Pass";
} else {
    cout << "Fail";
}`,
      },
      {
        id: 'cpp-3-loops-arrays',
        title: '3. For Loops & Basic Arrays in C++',
        duration: '20 mins',
        concept: `An Array in C++ lets you store multiple values of the same type together in a single row in memory. For example, int scores[4] = {10, 20, 30, 40}; creates a row of 4 integers.

We can pair an array with a for-loop to visit every item from index 0 to index 3 and calculate their total sum in just 3 lines of code!`,
        whyItMatters:
          'Arrays and loops are the starting point of Data Structures and Algorithms (DSA).',
        codeTitle: 'array-sum.cpp',
        code: `#include <iostream>
using namespace std;

int main() {
    int marks[4] = {80, 85, 90, 95};
    int total = 0;

    // Loop through indexes 0, 1, 2, 3
    for (int i = 0; i < 4; i++) {
        total = total + marks[i];
    }

    cout << "Total Marks: " << total << endl;
    return 0;
}`,
        output: `Total Marks: 350`,
        lineByLine: [
          'int marks[4] = {80, 85, 90, 95}; — Creates an integer array holding 4 numbers.',
          'for (int i = 0; i < 4; i++) — Repeats for i = 0, 1, 2, and 3.',
          'total = total + marks[i]; — Adds each subject mark into the total box.',
        ],
        pitfalls: [
          'Accessing marks[4] when the array size is 4—remember valid positions are only 0, 1, 2, and 3!',
        ],
        challenge:
          'Using the same loop pattern, print each element of int arr[3] = {5, 10, 15}; on a new line.',
        solution: `int arr[3] = {5, 10, 15};
for (int i = 0; i < 3; i++) {
    cout << arr[i] << endl;
}`,
      },
    ],
    faqs: [
      {
        q: 'Should I learn C++ or Python first in college?',
        a: 'Learning C++ first teaches you how computer memory, data types, and arrays actually work under the hood, which makes learning Python or JavaScript afterward feel effortless.',
      },
    ],
  },

  python: {
    title: 'Python for Absolute Beginners',
    category: 'Programming & AI',
    level: 'Zero to Intermediate',
    estimatedHours: '10 Hours',
    overview:
      'Python reads just like plain English! Learn variables, lists, loops, functions, and dictionaries without worrying about complex semicolons or curly braces.',
    cheatSheet: [
      { concept: 'Print to Screen', syntax: 'print("Hello Python")', keyRule: 'Displays text or variables directly in the terminal.' },
      { concept: 'Variable', syntax: 'name = "Rohan"', keyRule: 'No need to write int, let, or semicolon—just assign directly!' },
      { concept: 'List (Array)', syntax: 'items = [10, 20, 30]', keyRule: 'Ordered collection of items; add new items with items.append(40).' },
      { concept: 'For Loop', syntax: 'for x in range(5):', keyRule: 'Repeats the indented block 5 times (for 0, 1, 2, 3, 4).' },
    ],
    modules: [
      {
        id: 'py-1-basics',
        title: '1. Writing Your First Python Code & Variables',
        duration: '15 mins',
        concept: `Python is famous for being the friendliest programming language in the world. Why? Because there are no semicolons (;), no curly braces ({ }), and no complicated setup lines!

You simply write print("Hello") to show text on the screen, and create variables by typing a name and an equals sign.`,
        whyItMatters:
          'Python is the #1 language for Artificial Intelligence, Data Science, Automation, and rapid backend development.',
        codeTitle: 'basics.py',
        code: `# 1. Creating variables in Python is super clean
student_name = "Priya"
semester = 4
cgpa = 9.1

# 2. Using f-strings (put an 'f' before quotes to insert variables!)
print(f"Student {student_name} is in semester {semester}")
print("CGPA:", cgpa)`,
        output: `Student Priya is in semester 4
CGPA: 9.1`,
        lineByLine: [
          'student_name = "Priya" — Creates a variable holding text.',
          'print(f"Student {student_name}...") — An f-string lets you plug variables directly inside { } within your text.',
        ],
        pitfalls: [
          'Adding extra spaces at the very beginning of a line—Python uses indentation (spaces) to group code, so start normal lines at the left edge!',
        ],
        challenge:
          'Create two variables a = 15 and b = 4, and print their multiplication result.',
        solution: `a = 15
b = 4
print(a * b) # Prints 60`,
      },
      {
        id: 'py-2-decisions-loops',
        title: '2. Indentation, If/Else & For Loops in Python',
        duration: '20 mins',
        concept: `Instead of curly braces { }, Python uses a colon (:) and 4 spaces of indentation to know which lines belong inside an if-statement or a loop.

To repeat something in Python, we use for i in range(start, stop): which counts automatically for us!`,
        whyItMatters:
          'Loops and conditions let you automate repetitive file tasks and analyze thousands of data rows in seconds.',
        codeTitle: 'loops_and_if.py',
        code: `# Loop through numbers 1, 2, 3 (range stops one before 4!)
for num in range(1, 4):
    if num == 2:
        print(num, "is my favorite number!")
    else:
        print("Counting:", num)`,
        output: `Counting: 1
2 is my favorite number!
Counting: 3`,
        lineByLine: [
          'for num in range(1, 4): — Counts from 1 up to 3 (it stops right before the second number, 4).',
          '    if num == 2: — Indented by 4 spaces so Python knows it is inside the loop.',
        ],
        pitfalls: [
          'Forgetting the colon (:) at the end of an if, else, for, or def line.',
          'Forgetting that range(1, 5) stops at 4, not 5!',
        ],
        challenge:
          'Write a Python for loop that prints the square of numbers from 1 to 3.',
        solution: `for n in range(1, 4):
    print(n * n)`,
      },
    ],
    faqs: [
      {
        q: 'Why does range(1, 5) stop at 4 instead of 5?',
        a: 'In Python, the second number in range(start, stop) is the exclusive upper bound. This makes it easy to work with zero-based list lengths like range(0, len(my_list)).',
      },
    ],
  },
};

// ============================================================================
// BEGINNER-FRIENDLY CURRICULUM GENERATOR FOR ALL OTHER TRACKS
// (DSA, MySQL, MongoDB, Backend, Next.js, TypeScript, OS, Computer Networks)
// ============================================================================
const BEGINNER_TRACKS = {
  'dsa-with-cpp': {
    title: 'DSA with C++ (Beginner Friendly)',
    category: 'Data Structures & Algorithms',
    level: 'Step-by-Step Beginner',
    estimatedHours: '20 Hours',
    overview: 'Stop fearing Data Structures! Learn how Arrays, Vectors, Searching, and Sorting work using simple real-life examples and clean, annotated C++ code.',
    cheatSheet: [
      { concept: 'Array / Vector', syntax: 'vector<int> v = {10, 20, 30};', keyRule: 'A resizable list of items stored side-by-side in memory.' },
      { concept: 'Add to Vector', syntax: 'v.push_back(40);', keyRule: 'Attaches a new number to the end of the vector.' },
      { concept: 'Linear Search', syntax: 'for (int x : v) if (x == key)...', keyRule: 'Checks every item one by one from left to right.' },
      { concept: 'Sort List', syntax: 'sort(v.begin(), v.end());', keyRule: 'Arranges numbers in ascending order automatically.' },
    ],
    modules: [
      {
        id: 'dsa-1-vectors',
        title: '1. Dynamic Arrays (C++ STL Vector) Made Easy',
        duration: '15 mins',
        concept: `A normal array in C++ has a fixed size—once you create int arr[5], you can never add a 6th item to it!

To solve this, C++ gives us a Vector (std::vector). Think of a Vector like a magic backpack that automatically expands whenever you put a new item inside using .push_back().`,
        whyItMatters: 'In 95% of coding interviews and online tests, you will use vector instead of raw arrays.',
        codeTitle: 'vector-basics.cpp',
        code: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    // 1. Create a vector of numbers
    vector<int> scores = {10, 20, 30};

    // 2. Add a new number to the end
    scores.push_back(40);

    // 3. Print first item and total size
    cout << "First Score: " << scores[0] << endl;
    cout << "Total Items: " << scores.size() << endl;
    return 0;
}`,
        output: `First Score: 10
Total Items: 4`,
        lineByLine: [
          '#include <vector> — Loads the C++ Vector tool.',
          'scores.push_back(40); — Adds 40 to the end of our list.',
          'scores.size() — Tells us how many items are currently inside (4).',
        ],
        pitfalls: ['Trying to access scores[0] on an empty vector before adding any items.'],
        challenge: 'Create an empty vector<int> nums, push_back the number 99, and print nums[0].',
        solution: `vector<int> nums;
nums.push_back(99);
cout << nums[0];`,
      },
      {
        id: 'dsa-2-searching',
        title: '2. Finding an Item: Linear Search vs Binary Search',
        duration: '20 mins',
        concept: `Imagine looking for roll number 45 in a list of students:
• Linear Search: You check every single student from the start one by one until you find 45. Simple, and works even if the list is jumbled!
• Binary Search: If the roll numbers are sorted in order (10, 20, 30, 45, 60), you jump straight to the middle! If the middle number is smaller than 45, you ignore the entire left half and only search the right half.`,
        whyItMatters: 'Binary search can find 1 item out of 1,000,000 sorted items in at most 20 steps!',
        codeTitle: 'linear-search.cpp',
        code: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    vector<int> rollNumbers = {12, 45, 23, 89};
    int target = 23;
    int foundIndex = -1;

    for (int i = 0; i < rollNumbers.size(); i++) {
        if (rollNumbers[i] == target) {
            foundIndex = i;
            break; // Stop searching once found!
        }
    }

    cout << "Found 23 at index: " << foundIndex << endl;
    return 0;
}`,
        output: `Found 23 at index: 2`,
        lineByLine: [
          'int foundIndex = -1; — Starts at -1 to mean "not found yet".',
          'if (rollNumbers[i] == target) — Checks if the current position matches 23.',
          'break; — Exits the loop early so we do not waste time checking remaining items.',
        ],
        pitfalls: ['Running Binary Search on an unsorted array—Binary Search ONLY works when the array is sorted!'],
        challenge: 'What will foundIndex print if we change target = 99 (a number not in the list)?',
        solution: `It will print -1, because the if condition never becomes true.`,
      },
    ],
  },

  mysql: {
    title: 'MySQL & Databases for Beginners',
    category: 'Database Fundamentals',
    level: 'Zero to Intermediate',
    estimatedHours: '10 Hours',
    overview: 'Learn how websites store user accounts, orders, and college records inside structured tables. Write your first SELECT, INSERT, WHERE, and JOIN queries in minutes.',
    cheatSheet: [
      { concept: 'Read Data', syntax: 'SELECT * FROM students;', keyRule: 'Fetches all columns (*) and rows from the students table.' },
      { concept: 'Filter Rows', syntax: 'SELECT name FROM students WHERE marks > 80;', keyRule: 'Only returns rows that match your condition.' },
      { concept: 'Insert New Row', syntax: 'INSERT INTO students VALUES (1, "Aman", 90);', keyRule: 'Adds a brand new record into the table.' },
      { concept: 'Sort Results', syntax: 'ORDER BY marks DESC;', keyRule: 'Sorts results from highest to lowest (ASC for lowest to highest).' },
    ],
    modules: [
      {
        id: 'sql-1-select',
        title: '1. What is a Database Table & Your First SELECT Query',
        duration: '15 mins',
        concept: `Think of a Relational Database (like MySQL) as a collection of clean Excel spreadsheets called Tables.
• Every Column holds a specific attribute (like id, name, branch, marks).
• Every Row holds one complete record (like one specific student's details).

To ask the database for information, we write a query in SQL (Structured Query Language) using the SELECT command.`,
        whyItMatters: 'Every backend developer and data analyst writes SELECT queries daily.',
        codeTitle: 'first-query.sql',
        code: `-- 1. Get ONLY the name and marks of students scoring above 85
SELECT name, marks
FROM students
WHERE marks > 85
ORDER BY marks DESC;`,
        output: `+--------+-------+
| name   | marks |
+--------+-------+
| Priya  |    94 |
| Aarav  |    88 |
+--------+-------+`,
        lineByLine: [
          'SELECT name, marks — Tells MySQL which columns we want to see.',
          'FROM students — Specifies the table name to look inside.',
          'WHERE marks > 85 — Filters out anyone with 85 or less.',
          'ORDER BY marks DESC — Sorts the winners from highest marks to lowest.',
        ],
        pitfalls: ['Forgetting quotes around text in WHERE clauses (e.g., write WHERE branch = "ECE", not WHERE branch = ECE).'],
        challenge: 'Write a SQL query to select all columns (*) from a table named books where price is less than 500.',
        solution: `SELECT * FROM books WHERE price < 500;`,
      },
    ],
  },
};

export function getSkillCurriculum(slug) {
  if (SKILLS_DATA[slug]) return SKILLS_DATA[slug];
  if (BEGINNER_TRACKS[slug]) {
    return {
      ...BEGINNER_TRACKS[slug],
      faqs: [
        {
          q: `Is this ${BEGINNER_TRACKS[slug].title} guide suitable for total beginners?`,
          a: `Yes! Every module starts with a plain-English analogy, a short runnable example, its exact terminal output, and a line-by-line explanation.`,
        },
      ],
    };
  }

  const cleanName = slug
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');

  return {
    title: `${cleanName} for Beginners`,
    category: 'Step-by-Step Starter Guide',
    level: 'Beginner Friendly',
    estimatedHours: '10 Hours',
    overview: `Learn ${cleanName} from scratch with simple real-world analogies, short beginner-friendly code examples, expected terminal outputs, and line-by-line breakdowns.`,
    cheatSheet: [
      { concept: 'Step 1: Setup & Init', syntax: 'initialize()', keyRule: 'Start with a clean, minimal configuration before adding features.' },
      { concept: 'Step 2: Read / Output', syntax: 'displayResult(data)', keyRule: 'Always verify your output on a small example first.' },
      { concept: 'Step 3: Error Check', syntax: 'if (!data) return "Empty";', keyRule: 'Check for empty inputs so your program never crashes.' },
    ],
    modules: [
      {
        id: `${slug}-1-intro`,
        title: `1. What is ${cleanName} & Why Do We Use It? (Plain-English Intro)`,
        duration: '15 mins',
        concept: `When beginners first hear about ${cleanName}, textbooks often throw complicated jargon at them. Let's keep it simple: ${cleanName} is a tool that helps computers organize tasks, process data reliably, and respond to users quickly.

Instead of memorizing complex theory all at once, the easiest way to learn ${cleanName} is to look at a tiny working example, see what goes in (Input), and see what comes out (Output).`,
        whyItMatters: `Builds your foundational confidence for college labs, projects, and viva exams in ${cleanName}.`,
        codeTitle: `hello-${slug}.js`,
        code: `// A simple beginner example for ${cleanName}
const topicName = "${cleanName}";
let isBeginnerFriendly = true;

if (isBeginnerFriendly) {
  console.log("Welcome to", topicName);
  console.log("Status: Ready to learn step-by-step!");
}`,
        output: `Welcome to ${cleanName}
Status: Ready to learn step-by-step!`,
        lineByLine: [
          `const topicName = "${cleanName}"; — Stores the name of the subject inside a variable.`,
          'let isBeginnerFriendly = true; — Sets a true/false flag to true.',
          'console.log(...); — Prints our friendly welcome message into the output box below.',
        ],
        pitfalls: [
          'Trying to memorize big complex programs without understanding what each individual line prints first.',
        ],
        challenge: `Modify the message above in your head: what would print if isBeginnerFriendly was set to false?`,
        solution: `Nothing would print! Because the if-condition is false, the program skips the block completely.`,
      },
      {
        id: `${slug}-2-core-building-blocks`,
        title: `2. Core Building Blocks & Hands-On Example`,
        duration: '20 mins',
        concept: `Every project in ${cleanName} follows three simple steps:
1. Take input data (like a student's name or a search query).
2. Process or format that data using a simple rule.
3. Return or display the clean result.

Let's see a small function that takes a student's score and returns their status clearly.`,
        whyItMatters: `Once you understand Input -> Process -> Output, you can build any feature in ${cleanName}.`,
        codeTitle: `${slug}-step2.js`,
        code: `function checkProgress(completedLessons, totalLessons) {
  let percentage = (completedLessons / totalLessons) * 100;
  return "Course Progress: " + percentage + "%";
}

// Let's test our function with 2 completed out of 4
let message = checkProgress(2, 4);
console.log(message);`,
        output: `Course Progress: 50%`,
        lineByLine: [
          'function checkProgress(...) — Creates a reusable helper that accepts two numbers.',
          '(completedLessons / totalLessons) * 100 — Calculates the percentage (2 / 4 * 100 = 50).',
          'console.log(message); — Prints "Course Progress: 50%" to the terminal.',
        ],
        pitfalls: [
          'Dividing by 0 (make sure totalLessons is always at least 1).',
        ],
        challenge: `What will checkProgress(3, 4) return?`,
        solution: `"Course Progress: 75%"`,
      },
    ],
    faqs: [
      {
        q: `Do I need prior experience before starting ${cleanName}?`,
        a: `No! Start with Module 1 above, read the Line-by-Line Breakdown beneath each terminal box, and try the small self-test challenge at your own pace.`,
      },
    ],
  };
}
// To build GameLevels, each contains GameObjects from below imports
import Background from './Background.js';
import Player from './Player.js';
import Npc from './Npc.js';
import Quiz from './Quiz.js';
import GameControl from './GameControl.js';
import GameLevelStarWars from './GameLevelStarWars.js';

class GameLevelBasement {
  constructor(gameEnv) {
    // Values dependent on this.gameEnv.create()
    let width = gameEnv.innerWidth;
    let height = gameEnv.innerHeight;
    let path = gameEnv.path;

    // Background data
    const image_src_basement = path + "/images/gamify/basement.png"; // be sure to include the path
    const image_data_basement = {
        name: 'basement',
        greeting: "Where are you? Your head hurts so much. Who are these people surrounding me?",
        src: image_src_basement,
        pixels: {height: 675, width: 1200}
    };


    // Player data for Main Character
    const sprite_src_degen = path + "/images/gamify/degen.png"; // be sure to include the path
    const DEGEN_SCALE_FACTOR = 7;
    const sprite_data_degen = {
        id: 'Degen',
        greeting: "I don't remember my name..but I remember a lot of people around me used to call me degen. I guess that's what I'll be called for now.",
        src: sprite_src_degen,
        SCALE_FACTOR: DEGEN_SCALE_FACTOR,  // Adjust this based on your scaling needs
        STEP_FACTOR: 250,
        ANIMATION_RATE: 20,
        INIT_POSITION: { x: 0, y: height - (height/DEGEN_SCALE_FACTOR) }, 
        pixels: {height: 600, width: 520},
        orientation: {rows: 4, columns: 4 },
        down: {row: 0, start: 0, columns: 4 },
        downRight: {row: 1, start: 0, columns: 4, rotate: Math.PI/16 },
        downLeft: {row: 2, start: 0, columns: 4, rotate: -Math.PI/16 },
        left: {row: 2, start: 0, columns: 4 },
        right: {row: 1, start: 0, columns: 4 },
        up: {row: 3, start: 0, columns: 4 },
        upLeft: {row: 2, start: 0, columns: 4, rotate: Math.PI/16 },
        upRight: {row: 1, start: 0, columns: 4, rotate: -Math.PI/16 },
        hitbox: { widthPercentage: 0.45, heightPercentage: 0.2 },
        keypress: { up: 87, left: 65, down: 83, right: 68 } // W, A, S, D
    };

     // Conversation flow for Asaka
     const conversationFlowAsaka = {
      start: {
        question: "Do you remember your name?",
        answers: {
          "No.": "no",
          "Yes.": "yes"
        }
      },
      no: {
        question: "What do you remember?",
        answers: {
          "Nothing.": "explore",
          "Chat": "chat"
        }
      },
      feelingBad: {
        question: "I'm sorry to hear that. Do you want to talk about it?",
        answers: {
          "Yes": "talkAboutIt",
          "No": "changeTopic"
        }
      },
      explore: {
        question: "Exploring sounds fun! Where do you want to go?",
        answers: {
          "Forest": "forest",
          "City": "city"
        }
      },
      chat: {
        question: "Let's chat! What's on your mind?",
        answers: {
          "Hobbies": "hobbies",
          "Work": "work"
        }
      },
      talkAboutIt: {
        question: "I'm here to listen. What's bothering you?",
        answers: {
          "Stress": "stress",
          "Health": "health"
        }
      },
      changeTopic: {
        question: "Alright, let's change the topic. What do you want to talk about?",
        answers: {
          "Hobbies": "hobbies",
          "Work": "work"
        }
      },
      // Add more conversation nodes as needed
    };


    // NPC data for Asaka
    const sprite_src_asaka = path + "/images/gamify/asaka.png"; // be sure to include the path
    const sprite_greet_asaka = "You don't belong here, do you? ( Press e to interact with Asaka, she will ask you questions. There will be two options, please type in the whole response you would like to respond with. )";
    const sprite_data_asaka = {
        id: 'Asaka',
        greeting: sprite_greet_asaka,
        src: sprite_src_asaka,
        SCALE_FACTOR: 5,  // Adjust this based on your scaling needs
        ANIMATION_RATE: 50,
        pixels: {height: 316, width: 189},
        INIT_POSITION: { x: (width / 2), y: (height / 1.7)},
        orientation: {rows: 4, columns: 3 },
        down: {row: 0, start: 0, columns: 3 },  // This is the stationary npc, down is default 
        hitbox: { widthPercentage: 0.1, heightPercentage: 0.2 },
        conversation: new Conversation(conversationFlowAsaka),
        reaction: function() {
          alert(sprite_greet_asaka);
        },   
        // Interaction function for Asaka
        interact: function() {
          const conversation = sprite_data_asaka.conversation;
          const question = conversation.getCurrentQuestion();
          const answers = conversation.getCurrentAnswers();
          let answer = prompt(`${question}\n${answers.join('\n')}`);
          if (answers.includes(answer)) {
            conversation.answerQuestion(answer);
          } else {
            alert("Invalid answer. Please try again.");
          }
        }
    };


      // NPC data for Miku
      const sprite_src_miku = path + "/images/gamify/miku.png"; // be sure to include the path
      const sprite_greet_miku = "OMG HI UWU MY NAME IS MIKU I'M SO SUPER DUPER STOKED TO MEET YOU!";
      const sprite_data_miku = {
        id: 'Miku',
        greeting: sprite_greet_miku,
        src: sprite_src_miku,
        SCALE_FACTOR: 5,  // Adjust this based on your scaling needs
        ANIMATION_RATE: 50,
        pixels: {height: 316, width: 189},
        INIT_POSITION: { x: (width / 12), y: (height / 1.8)},
        orientation: {rows: 4, columns: 3 },
        down: {row: 0, start: 0, columns: 3 },  // This is the stationary npc, down is default 
        hitbox: { widthPercentage: 0.1, heightPercentage: 0.1 },
        // GitHub command quiz 
        quiz: { 
          title: "GitHub Command Quiz",
          questions: [
            "Which command is used to clone a repository?\n1. git clone\n2. git fork\n3. git copy\n4. git download",
            "Which command is used to add changes to the staging area?\n1. git add\n2. git stage\n3. git commit\n4. git push",
            "Which command is used to commit changes?\n1. git commit\n2. git add\n3. git save\n4. git push",
            "Which command is used to push changes to a remote repository?\n1. git push\n2. git upload\n3. git send\n4. git commit",
            "Which command is used to pull changes from a remote repository?\n1. git pull\n2. git fetch\n3. git receive\n4. git update",
            "Which command is used to check the status of the working directory and staging area?\n1. git status\n2. git check\n3. git info\n4. git log",
            "Which command is used to create a new branch?\n1. git branch\n2. git create-branch\n3. git new-branch\n4. git checkout",
            "Which command is used to switch to a different branch?\n1. git checkout\n2. git switch\n3. git change-branch\n4. git branch",
            "Which command is used to merge branches?\n1. git merge\n2. git combine\n3. git join\n4. git integrate",
            "Which command is used to view the commit history?\n1. git log\n2. git history\n3. git commits\n4. git show"
          ] 
        },
        reaction: function() {
          alert(sprite_greet_miku);
        },
        interact: function() {
          let quiz = new Quiz(); // Create a new Quiz instance
          quiz.initialize();
          quiz.openPanel(sprite_data_miku.quiz);
        }
    }
  

    const sprite_src_nezuko = path + "/images/gamify/nezuko.png"; // be sure to include the path
    const sprite_greet_nezuko = "I've never seen you before. Are you lost? Well, even if you are.. I don't think I'm going to help you get out of here.";
    const sprite_data_nezuko = {
      id: 'Nezuko',
      greeting: sprite_greet_nezuko,
      src: sprite_src_nezuko,
      SCALE_FACTOR: 5,  // Adjust this based on your scaling needs
      ANIMATION_RATE: 50,
      pixels: {height: 316, width: 189},
      INIT_POSITION: { x: (width / 1.3), y: (height / 1.3)},
      orientation: {rows: 4, columns: 3 },
      down: {row: 0, start: 0, columns: 3 },  // This is the stationary npc, down is default 
      hitbox: { widthPercentage: 0.1, heightPercentage: 0.2 },
      // Linux command quiz
      quiz: { 
        title: "Jupyter Notebook Command Quiz",
        questions: [
          "Which shortcut is used to run a cell in Jupyter Notebook?\n1. Shift + Enter\n2. Ctrl + Enter\n3. Alt + Enter\n4. Tab + Enter",
          "Which shortcut adds a new cell above the current cell?\n1. A\n2. B\n3. C\n4. D",
          "Which shortcut adds a new cell below the current cell?\n1. B\n2. A\n3. C\n4. D",
          "Which shortcut changes a cell to Markdown format?\n1. M\n2. Y\n3. R\n4. K",
          "Which shortcut changes a cell to Code format?\n1. Y\n2. M\n3. C\n4. D",
          "Which shortcut deletes the current cell?\n1. D, D\n2. X\n3. Del\n4. Ctrl + D",
          "Which shortcut saves the current notebook?\n1. Ctrl + S\n2. Alt + S\n3. Shift + S\n4. Tab + S",
          "Which shortcut restarts the kernel?\n1. 0, 0\n2. R, R\n3. K, K\n4. Shift + R",
          "Which shortcut interrupts the kernel?\n1. I, I\n2. Ctrl + C\n3. Shift + I\n4. Alt + I",
          "Which shortcut toggles line numbers in a cell?\n1. L\n2. N\n3. T\n4. G"
        ] 
      },
      reaction: function() {
        alert(sprite_greet_nezuko);
      },
      interact: function() {
        let quiz = new Quiz(); // Create a new Quiz instance
        quiz.initialize();
        quiz.openPanel(sprite_data_nezuko.quiz);
      }
    }

    // List of objects defnitions for this level
    this.classes = [
      { class: Background, data: image_data_basement },
      { class: Player, data: sprite_data_degen },
      { class: Npc, data: sprite_data_asaka },
      { class: Npc, data: sprite_data_miku },
      { class: Npc, data: sprite_data_nezuko },
    ];
    
  }

}

// Conversation class for Asaka 
class Conversation {
  constructor(flow) {
    this.flow = flow;
    this.currentNode = "start";
  }

  getCurrentQuestion() {
    return this.flow[this.currentNode].question;
  }

  getCurrentAnswers() {
    return Object.keys(this.flow[this.currentNode].answers);
  }

  answerQuestion(answer) {
    const nextNode = this.flow[this.currentNode].answers[answer];
    if (nextNode) {
      this.currentNode = nextNode;
    }
  }
}

export default GameLevelBasement;
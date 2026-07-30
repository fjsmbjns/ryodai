"use strict";


// ========================================
// シーンデータ
// ========================================

const scenes = [

  // =====================================
  // SCENE 1
  // =====================================

  {
    id: "scene1",

    name: "リョウダイ",

    character: "",

    dialogue:
      "今日から入った人やろ？ 俺、リョウダイ。なんか分からんことあったら聞いて。",

    choices: [

      {
        text:
          "ありがとうございます！",

        affection: 20,

        response:
          "おー、よろしく！ そがん緊張せんでよかって。"
      },

      {
        text:
          "……背、高いですね",

        affection: 10,

        response:
          "そこ！？ まあ、よう言われるけどね。"
      },

      {
        text:
          "できれば静かに仕事したいです",

        affection: 0,

        response:
          "あ、そうなん？ まあよかけど。"
      }

    ]
  },


  // =====================================
  // SCENE 2
  // =====================================

  {
    id: "scene2",

    name: "リョウダイ",

    character: "",

    dialogue:
      "飯まだやろ？ 一緒行こうで。",

    choices: [

      {
        text:
          "行きます！",

        affection: 20,

        response:
          "よし。じゃあ行こう。何食いたい？"
      },

      {
        text:
          "え、二人でですか？",

        affection: 10,

        response:
          "二人じゃダメなん？"
      },

      {
        text:
          "今日はコンビニでいいです",

        affection: 0,

        response:
          "そがん寂しかこと言わんでもよかろ。"
      }

    ]
  },


  // =====================================
  // SCENE 3
  // =====================================

  {
    id: "scene3",

    name: "リョウダイ",

    character: "",

    dialogue:
      "レイと話しよっただけやけど。どうした？",

    choices: [

      {
        text:
          "別に何でもないです",

        affection: 20,

        response:
          "いや、絶対なんかあるやろ。"
      },

      {
        text:
          "レイちゃんと仲良いですね",

        affection: 10,

        response:
          "まあね。あいつ面白かけん。"
      },

      {
        text:
          "付き合ってるんですか？",

        affection: 0,

        response:
          "は？ なんでそうなると？"
      }

    ]
  },


  // =====================================
  // SCENE 4
  // =====================================

  {
    id: "scene4",

    name: "ミッキー",

    character: "",

    dialogue:
      "最近、リョウダイさんと仲良いですよね。……ハハッ。",

    choices: [

      {
        text:
          "もしかして嫉妬してます？",

        affection: 20,

        response:
          "嫉妬ではないですよ。僕はただ、リョウダイさんが好きなだけです。ハハッ。"
      },

      {
        text:
          "一緒に帰ります？",

        affection: 10,

        response:
          "いいんですか？ リョウダイさんも呼びましょう。"
      },

      {
        text:
          "ちょっと怖いです",

        affection: 0,

        response:
          "そんなこと言わないでくださいよ。ハハッ。"
      }

    ]
  },


  // =====================================
  // SCENE 5
  // =====================================

  {
    id: "scene5",

    name: "リョウダイ",

    character: "",

    dialogue:
      "なんでそがん自信なかと？ 俺はお前とおるの楽しかけど。",

    choices: [

      {
        text:
          "私もリョウダイさんといるのが好きです",

        affection: 20,

        response:
          "じゃあ、もう答え出とるやん。"
      },

      {
        text:
          "……本当に？",

        affection: 10,

        response:
          "俺が嘘つく意味なかろ。"
      },

      {
        text:
          "どうせ誰にでも言ってますよね",

        affection: 0,

        response:
          "なんでそがん悪い方に考えると？"
      }

    ]
  }

];


// ========================================
// ゲーム状態
// ========================================

let currentSceneIndex = 0;

let affection = 0;

let choiceSelected = false;


// ========================================
// HTML要素
// ========================================

const characterImage =
  document.getElementById(
    "character-image"
  );


const characterName =
  document.getElementById(
    "character-name"
  );


const dialogueText =
  document.getElementById(
    "dialogue-text"
  );


const choicesContainer =
  document.getElementById(
    "choices"
  );


const nextButton =
  document.getElementById(
    "next-button"
  );


const affectionValue =
  document.getElementById(
    "affection-value"
  );


// ========================================
// シーン表示
// ========================================

function showScene() {

  const scene =
    scenes[currentSceneIndex];


  choiceSelected = false;


  // キャラクター名
  characterName.textContent =
    scene.name;


  // セリフ
  dialogueText.textContent =
    scene.dialogue;


  // キャラクター画像
  if (scene.character) {

    characterImage.src =
      scene.character;


    characterImage.style.display =
      "block";

  }

  else {

    characterImage.removeAttribute(
      "src"
    );


    characterImage.style.display =
      "none";

  }


  // 古い選択肢を消す
  choicesContainer.innerHTML =
    "";


  // 次へを隠す
  nextButton.style.display =
    "none";


  // 選択肢を作る
  scene.choices.forEach(
    function(choice) {

      const button =
        document.createElement(
          "button"
        );


      button.type =
        "button";


      button.className =
        "choice-button";


      button.textContent =
        choice.text;


      button.addEventListener(
        "click",

        function() {

          selectChoice(
            choice
          );

        }
      );


      choicesContainer.appendChild(
        button
      );

    }
  );

}


// ========================================
// 選択肢
// ========================================

function selectChoice(choice) {

  if (choiceSelected) {

    return;

  }


  choiceSelected = true;


  // 好感度
  affection +=
    choice.affection;


  if (affection > 100) {

    affection = 100;

  }


  // 好感度更新
  affectionValue.textContent =
    affection;


  // 選択肢を消す
  choicesContainer.innerHTML =
    "";


  // 返答
  dialogueText.textContent =
    choice.response;


  // 次へ表示
  nextButton.style.display =
    "block";

}


// ========================================
// 次へボタン
// ========================================

nextButton.addEventListener(
  "click",

  function() {

    currentSceneIndex++;


    // 最終シーン終了
    if (
      currentSceneIndex >=
      scenes.length
    ) {

      showEnding();

      return;

    }


    showScene();

  }
);


// ========================================
// エンディング
// ========================================

function showEnding() {

  choicesContainer.innerHTML =
    "";


  nextButton.style.display =
    "none";


  // HAPPY END
  if (affection >= 80) {

    characterName.textContent =
      "リョウダイ";


    dialogueText.innerHTML =
      "俺、お前のこと好きやけど。" +
      "<br><br>" +
      "俺と付き合えばよくない？" +
      "<br><br>" +
      "♡ HAPPY END ♡";

  }


  // NORMAL END
  else if (affection >= 40) {

    characterName.textContent =
      "リョウダイ";


    dialogueText.innerHTML =
      "また明日な。" +
      "<br><br>" +
      "NORMAL END";

  }


  // BAD END
  else {

    characterName.textContent =
      "リョウダイ";


    dialogueText.innerHTML =
      "ん？ お前？" +
      "<br><br>" +
      "……新しく入った人やろ？" +
      "<br><br>" +
      "BAD END" +
      "<br>" +
      "『新しく入った人』";

  }

}


// ========================================
// ゲーム開始
// ========================================

showScene();

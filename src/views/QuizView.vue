<template>
    <div class="screen-bg">

        <QuizEnd v-if="endofQuiz" :percent="percentageScore" @restartQuiz='onQuizRestart' />

        <div class="d-flex justify-center align-center text-center text-white flex-column pt-9">
            <v-col cols="12" sm="11" md="10" lg="10" class="d-flex justify-center flex-column">
                <v-card class="px-3 px-md-8 py-5" variant="outlined" color="white">
                    <div class="d-flex justify-center flex-column align-center">
                        <div>
                            <img src="@/assets/artemind-logo.svg" alt="" class="w-75">
                            <h1 class="text-center text-subtitle-1 font-weight-black">THERE IS ONLY ONE ART, KNOWLEDGE.
                            </h1>
                        </div>
                    </div>

                    <div class="mt-3">
                        <v-divider color="white" class=""></v-divider>
                        <v-card variant="tonal" class="pa-5">
                            <div class="d-flex">

                                <h3 class="text-subtitle-2 text-md-h5">Difficulty: <span
                                        class="text-cyan">{{ currentQuestion.difficulty }}</span></h3>
                                <v-spacer></v-spacer>
                                <h3 class="text-subtitle-2 text-md-h5">Score: <span class="text-cyan">{{ score }}</span>
                                </h3>


                            </div>
                        </v-card>
                        <v-divider color="white" class="mb-3"></v-divider>
                    </div>
                    <div class="">
                        <v-card class="pa-3 mb-2 text-center font-weight-bold text-subtitle-1 " :color="choiceColor">
                            <v-card variant="outlined" color="cyan" class="pa-3 bg-white">
                                <p class="text-center text-subtitle-1 "> Question {{ questionCounter }} of 10 </p>
                                <v-progress-linear :model-value="timer" color="light-blue" height="10" striped
                                    class="mb-5">
                                </v-progress-linear>

                                <span class="text-black text-md-h5 ">
                                    <!-- {{ currentQuestion.question }} -->
                                    {{formattedQuestion}}
                                </span>

                            </v-card>

                        </v-card>
                        <v-row no-gutters>
                            <v-col v-for="(choice, item) in currentQuestion.choices" :key="item" cols="12" sm="6"
                                class="cursor-pointer ">
                                <v-hover>
                                    <template v-slot:default="{ isHovering, props }">
                                        <v-card v-bind="props" :variant="isHovering ? 'outlined' : undefined"
                                            class="my-2 mx-1 " color="white">
                                            <div :ref="optionChosen" @click="onOptionClicked(choice, item)"
                                                class="pa-4 rounded-xl font-weight-black pa-md-7">
                                                {{ choice }}
                                            </div>
                                        </v-card>
                                    </template>
                                </v-hover>
                            </v-col>
                        </v-row>
                        <p class="text-center text-caption">Answer the Questions within the time frame or the quiz will
                            end.</p>
                    </div>
                </v-card>
            </v-col>
        </div>
    </div>
</template>

<script setup>
    import axios from 'axios';
    import {
        ref,
        onMounted,
        computed
    } from 'vue';
    import QuizEnd from '../components/QuizEnd.vue';

    let timer = ref(100);
    let canClick = true; // to select only one choice
    let questionCounter = ref(0); // to count the questions given
    let score = ref(0); // to see points
    let endofQuiz = ref(false);
    let percentageScore = ref(0);

    const choiceColor = ref('');

    const currentQuestion = ref({
        question: '',
        difficulty: '',
        answer: 1,
        choices: []
    });

    let questions = ref([]);

    const loadQuestion = () => {

        canClick = true;
        if (questions.length > questionCounter.value) {
            timer.value = 100;
            currentQuestion.value = questions[questionCounter.value];
            console.log("Current Question: " + currentQuestion.value.question)
            console.log('ANSWER:' + currentQuestion.value.answer)
            questionCounter.value++;
        } else {

            onQuizEnd();

            //console.log("No more Questions");
        }

    };

    let itemsRef = [];
    const optionChosen = (element) => {
        if (element) {
            itemsRef.push(element);
        }
    };

    const clearSelected = () => {
        setTimeout(() => {
            choiceColor.value = 'white';
            loadQuestion();
        }, 1000)

    }

    const onOptionClicked = (choice, item) => {

        if (canClick) {
            const optionID = item + 1;
            if (currentQuestion.value.answer == optionID) {
                console.log("---CORRECT");
                choiceColor.value = 'green';
                score.value += 10;
            } else {
                console.log("---INCORRECT")
                choiceColor.value = 'red';
            }

            timer.value = 100;
            canClick = false;

            clearSelected();
            //console.log(choice, item);
        } else {
            console.log("Can't Select Question")
        }
        //console.log(itemsRef[item]);

    };

    const countDownTimer = function () {
        let interVal = setInterval(() => {
            if (timer.value > 0) {
                timer.value--;
            } else {
                if (questionCounter > 10) {
                    onQuizEnd();
                } else {
                    onQuizEnd();
                    clearInterval(interVal);
                }
            }
        }, 100)
    }

    const fetchQuestionFromServer = async function () {
        axios({
            method: 'GET',
            url: 'https://opentdb.com/api.php?amount=10&category=25&type=multiple',
        }).then(response => {
            const newQuestions = response.data.results.map((serverQs) => {
                const arrangedQs = {
                    question: serverQs.question,
                    difficulty: serverQs.difficulty,
                    choices: "",
                    answer: "",
                }

                const choices = serverQs.incorrect_answers;

                arrangedQs.answer = Math.floor(Math.random() * 4 + 1);

                choices.splice(
                    arrangedQs.answer - 1,
                    0,
                    serverQs.correct_answer
                )
                arrangedQs.choices = choices;

                return arrangedQs;
            });
            //console.log(newQuestions);
            questions = newQuestions;
            loadQuestion();
            countDownTimer();
        });
    };

    const onQuizEnd = function () {
        percentageScore.value = (score.value / 100) * 100;
        timer.value = 0;
        endofQuiz.value = true;
    };

    const onQuizRestart = function () {
        canClick = true;
        timer.value = 100;
        endofQuiz.value = false;
        questionCounter.value = 0;
        score.value = 0;

        currentQuestion.value = {
            question: '',
            difficulty: '',
            answer: 1,
            choices: []
        };
        percentageScore.value = 0;
        questions.value = [];
        fetchQuestionFromServer();
    };


    onMounted(() => {
        fetchQuestionFromServer();
    });


    const formattedQuestion = computed(() => {
        let entities = {
            amp: "&",
            apos: "'",
            "#x27": "'",
            "#x2F": "/",
            "#39": "'",
            "#47": "/",
            lt: "<",
            gt: ">",
            nbsp: " ",
            quot: '"',
            "#039": "'",
            "&ldquo;": '",'
        }

        return currentQuestion.value.question.replace(/&([^;]+);/gm, function (
            match, entity
        ) {
            return entities[entity] || match;
        });
    });
</script>
<style scoped>
    .cursor-pointer {
        cursor: pointer;
    }

    .screen-bg {
        background: linear-gradient(0deg, rgba(0, 0, 0, 0.20), rgba(0, 0, 0, 0.65)), url("https://th-thumbnailer.cdn-si-edu.com/1G_5HsjRKwBpgSTymPMALv4-r_Q=/1000x750/filters:no_upscale():focal(2409x1653:2410x1654)/https://tf-cmsv2-smithsonianmag-media.s3.amazonaws.com/filer/f3/fa/f3fa8097-4f45-4555-96de-a6cc736e6587/van_gogh_angle1_starry_night_300dpi.jpg");
        background-repeat: no-repeat;
        background-size: cover;
        width: 100%;
        height: 100%;
    }
</style>
/*
 * Kana Master Quiz 0.1.0
 *
 * mono.company
 * Copyright 2015, Mono
*/

(function($) {
  $.fn.kanamasterQuiz = function(options) {

    var $quizScore = 0;
    // console.log('Score is: ' + $quizScore);
    var $quizQuestions = $('.quiz__item').length;
    // console.log('Amount of questions: ' + $quizQuestions);

    $('.quiz__item__input').change(function(e) {
      inputField = $(this);
      quizQuestion = $(this).parents('.quiz__item').find('.quiz__item__question').html();
      quizAnswer = $(this).parents('.quiz__item').find('.quiz__item__answer').html();
      // console.log('Quiz answer is ' + quizAnswer);
      inputtedValue = $(this).val();
      onQuizInput(inputtedValue, inputField, quizAnswer, quizQuestion);
    });

    function onQuizInput(inputtedValue, inputField, quizAnswer, quizQuestion) {

      // Validate input
      quizValidateInput(inputtedValue, inputField, quizAnswer, quizQuestion);

      // Navigate through questions
      quizNavigate();

    }

    function quizValidateInput(inputtedValue, inputField, quizAnswer, quizQuestion) {
      
      // console.log('Field is ' + inputField.attr('class'));

      var correctAnswer = quizAnswer;

      // Get correct answer
      // console.log('The correct answer: ' + correctAnswer);
      // console.log('The inputted value: ' + inputtedValue);
      
      if (correctAnswer == inputtedValue) {
        $quizScore++;
        console.log('Score is now: ' + $quizScore);
        $('.quiz-results__result__self').html($quizScore);
        
      } else {
        console.log('Score is still: ' + $quizScore);

        var mistakeRow = "<tr><td>" + quizQuestion + "</td><td>" + inputtedValue + "</td><td>" + correctAnswer + "</td></tr>";
        // A mistake was made, let's log in in the table
        $('.quiz-results__mistakes').removeClass('hide').find('table tbody').append(mistakeRow);
        
      }
    }

    function quizNavigate() {

      currentQuizItem = $('.quiz__item--active');
      currentQuizItem.removeClass('quiz__item--active');

      // If the quiz item is the last item
      if (currentQuizItem.is(':last-child')) {
        // Show quiz finished screen
        console.log('Quiz finished!');
        $('.quiz').addClass('hide');
        $('.quiz__finish').removeClass('hide').addClass('quiz__finish--anim');

        // View score
        $('.quiz__finish__view-score-btn').click(function(e) {
          $(this).parents('.quiz__finish').addClass('hide');
          
          // Check for perfect score whn you arrive at score screen
          if ($quizScore == $quizQuestions) {
            console.log($quizScore);
            console.log($quizQuestions);
            $('.quiz-results__perfect').removeClass('hide');
          }

          $('.quiz-results').removeClass('hide');
        });
      } else {
        // View the next question
        console.log('Next question!!');
        currentQuizItem.next().addClass('quiz__item--active');
      }

    }

  };
})(jQuery);

$(document).ready(function() {
  $('body').kanamasterQuiz();
});
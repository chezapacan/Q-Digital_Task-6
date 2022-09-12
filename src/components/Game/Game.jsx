import React, { Component } from 'react';
import s from './Game.module.css';
import Button from '../UI/Button/Button';
import WhiteBox from '../UI/WhiteBox/WhiteBox';
import Title from '../UI/Title/Title';
import Input from '../UI/Input/Input';
import Text from '../UI/Text/Text';
import { withNavigation } from '../hocs/withNavigation';
import Loader from '../UI/Loader/Loader';

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: localStorage.getItem('token'),
      diff: this.props.diff,
      time: this.props.time,
      question: this.props.question,
      options: this.props.options,
      score: 0,
      answer: '',
      gameEnd: false,
      data: null,
      loading: false,
    };
  }

  handleChangeAnswer = (e) => {
    this.setState({
      answer: e.target.value,
    });
  };

  handleClickNext = () => {
    this.nextQuestion();
  };

  nextQuestion = async (e) => {
    const answer = this.state.answer || e.target.textContent;
    if (+answer) {
      this.setState({
        loading: true,
      });

      const response = await fetch(
        'https://internsapi.public.osora.ru/api/game/play',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${this.state.token}`,
            'Content-Type': 'application/json;charset=utf-8',
          },
          body: JSON.stringify({
            answer: +answer,
            type_hard: this.props.diff,
            type: 2,
          }),
        }
      );
      const results = await response.json();
      if (results.status) {
        if (results.data.hasOwnProperty('questions')) {
          this.setState({
            gameEnd: true,
            data: results.data,
            score: results.data.points,
          });
        } else {
          this.setState({
            time: results.data.time,
            question: results.data.question,
            options: results.data.options,
            score: results.data.points,
          });
        }
      }
      this.setState({
        loading: false,
      });
    } else {
      alert('Answer must be a number');
    }
  };

  timer = () => {
    this.timerCount = setInterval(
      () =>
        this.setState((prev) => ({ time: prev.time < 1 ? 0 : prev.time - 1 })),
      1000
    );
  };

  componentDidMount() {
    this.timer();
  }
  componentDidUpdate() {
    clearInterval(this.timerCount);
    this.timer();
  }

  render() {
    let buttonOptions = null;
    if (this.state.options.length > 0) {
      buttonOptions = this.state.options.map((option) => (
        <div key={option} className={s.buttonWrapper}>
          <Button text={option} onClick={this.nextQuestion} />
        </div>
      ));
    } else {
      buttonOptions = (
        <>
          <Input placeholder='Answer' onChange={this.handleChangeAnswer} />
          <Button text='NEXT' onClick={this.handleClickNext} />
        </>
      );
    }

    return (
      <div className={s.wrapper}>
        <WhiteBox>
          <Title text={this.state.gameEnd ? 'Test end' : 'Test started'} />
          {!this.state.loading ? (
            <>
              <div className={s.textWrapper}>
                <Text text='Score: ' />
                <Text text={this.state.score} bold />
              </div>
              {this.state.gameEnd ? (
                <div className={s.tableWrapper}>
                  <div className={s.table}>
                    <Text text='Question' bold />
                    <Text text='Answer' bold />
                    <Text text='Correct' bold />
                  </div>
                  {this.state.data.questions.map((quest) => (
                    <div key={quest.id} className={s.table}>
                      <Text text={quest.question} />
                      <Text text={quest.current_answer} />
                      <Text text={quest.answer} />
                    </div>
                  ))}
                </div>
              ) : (
                <>
                  <div className={s.textWrapper}>
                    <Text text='Timer: ' />
                    <Text text={this.state.time} bold />
                  </div>
                  <Title text={`${this.state.question} = ?`} />
                  <div className={s.options}>{buttonOptions}</div>
                </>
              )}
            </>
          ) : (
            <Loader />
          )}

          <Button
            text={this.state.gameEnd ? 'REPEAT' : 'END TEST'}
            onClick={this.props.handleClickEnd}
          />
        </WhiteBox>
      </div>
    );
  }
}

export default withNavigation(Game);

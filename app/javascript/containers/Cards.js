import { connect } from 'react-redux'
import CardsList from '../components/CardsList'
import React from 'react'
import * as actions from '../actions'

class Cards extends React.Component{
  state = {
    currentStep: 1,
    selections: [],    
  }

  getWines = () => {
    const [
      ingredient_id,
      cooking_method_id,
      sauce_id,
      side_ids
    ] = this.state.selections
    return fetch('/api', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ingredient_id, 
        cooking_method_id,
        sauce_id,
        side_ids
      })
    }).then(res => {
      this.props.changeScreen('pairing', res);
    }, err => {
      console.log(err)
    });
  }
  
  addToSelections = (selection, index) => {
    const selections = Object.assign([], this.state.selections, {[index]:selection})
    console.log(selections)
    this.setState({ selections })
  }

  incrementCurrentStep = () => {
    this.setState({currentStep: this.state.currentStep+1})
  }
  render(){
    return (
      <CardsList 
        questions={this.props.questions}
        currentStep={this.state.currentStep}
        goToNextStep={this.incrementCurrentStep}
        addToSelections={this.addToSelections}
        onFinalStepSubmit={this.getWines}
      />
    )
  }
}

const mapStateToProps = state => {
  return {
    questions: state.questions
  }
}

const mapDispatchToProps = {
  changeScreen: actions.changeScreen
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Cards)

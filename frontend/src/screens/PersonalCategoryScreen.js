import React, { Component } from 'react';
import ScreenContainer from '../components/ScreenContainer';
import { Form, FormControl, Button, Table} from 'react-bootstrap';
import {apiCall} from '../utils/apiCall'
import AuthUtil from '../utils/AuthUtil';

class PersonalCategoryScreen extends Component {
  constructor (props){
    super(props);
    this.state = {
      isLoading: true,
      error: undefined,
      message: '',
      category: '',
      personalCategoryList: [],
      targetCategory: '',
      targetAmount: '',
      targetYear: '',
      personalTargetList: [],
      achievementCategory: '',
      achievementAmount: '',
      achievementYear: '',
      personalAchievementList: [],
      personalAchievementSummeryList: []
    }
  }

  setInputValue(property, val) {
    this.setState({
      [property]: val,
    });
  }

  getPersonalCategories = async () => {
    try {
      const { data } = await apiCall({
        method: 'post',
        URL: 'http://www.daansadaqah.com:8443/getPersonalCategories',
        payload: {
          p_userid: AuthUtil.getPhone()
        }
      });
    
      if(data.returnTables && data.returnTables[0]){
        this.setInputValue('isLoading', false);
        this.setInputValue('personalCategoryList', data.returnTables[0]);
      }
    } catch (err) {
      console.error(err);
    }
  };

  getPersonalTargets = async () => {
    try {
      const { data } = await apiCall({
        method: 'post',
        URL: 'http://www.daansadaqah.com:8443/pcTargetGet',
        payload: {
          p_userid: AuthUtil.getPhone()
        }
      });
    
      if(data.returnTables && data.returnTables[0]){
        this.setInputValue('isLoading', false);
        this.setInputValue('personalTargetList', data.returnTables[0]);
      }
    } catch (err) {
      console.error(err);
    }
  }

  getPersonalAchievements = async () => {
    try {
      const { data } = await apiCall({
        method: 'post',
        URL: 'http://www.daansadaqah.com:8443/pcActionGet',
        payload: {
          p_userid: AuthUtil.getPhone()
        }
      });
    
      if(data.returnTables && data.returnTables[0]){
        this.setInputValue('isLoading', false);
        this.setInputValue('personalAchievementList', data.returnTables[0]);
        this.setInputValue('personalAchievementSummeryList', data.returnTables[1]);
      }
    } catch (err) {
      console.error(err);
    }
  }

  onSaveCategoryHandler = async (e)=> {
    e.preventDefault();
    if (!this.state.category){
      this.setInputValue('error', "Please enter category first");
    }

    try {
      const {data} = await apiCall({
        method:'post',
        URL: 'http://www.daansadaqah.com:8443/savePersonalCategory',
        payload: {
          p_userid: AuthUtil.getPhone(),
          p_category: this.state.category
        },
      });
      const code = data.returnTables[0][0].code;
      if (code === 200){
        this.setInputValue('message', "Category Added Successfully");

      } 
      else if (code === 500){
        this.setInputValue('error', "Already Category Exists");
      }else {
        this.setInputValue('error', "Internal Error");
      }
    } catch (error) {
      
    }

  }

  onSaveTargetHandler = async (e)=> {
    e.preventDefault();
    if (!this.state.targetCategory && !this.state.targetAmount && !this.state.targetAmount){
      this.setInputValue('targetError', "Invalid Input");
    }

    try {
      const {data} = await apiCall({
        method:'post',
        URL: 'http://www.daansadaqah.com:8443/pcTargetSet',
        payload: {
          p_userid: AuthUtil.getPhone(),
          p_category: this.state.targetCategory,
          p_year: this.state.targetYear,
          p_value: this.state.targetAmount
        },
      });
      const code = data.returnTables[0][0].code;
      if (code === 200){
        this.setInputValue('message', "Category Added Successfully");

      } 
      else if (code === 500){
        this.setInputValue('error', "Already Category Exists");
      }else {
        this.setInputValue('error', "Internal Error");
      }
    } catch (error) {
      
    }
  }

  onSaveAchievementHandler = async (e)=> {
    e.preventDefault();
    if (!this.state.targetCategory && !this.state.targetAmount && !this.state.targetAmount){
      this.setInputValue('achievementError', "Invalid Input");
    }

    try {
      const {data} = await apiCall({
        method:'post',
        URL: 'http://www.daansadaqah.com:8443/pcActionGet',
        payload: {
          p_userid: AuthUtil.getPhone(),
          p_category: this.state.targetCategory,
          p_year: this.state.targetYear,
          p_value: this.state.targetAmount
        },
      });
      const code = data.returnTables[0][0].code;
      if (code === 200){
        this.setInputValue('message', "Category Added Successfully");

      } 
      else if (code === 500){
        this.setInputValue('error', "Already Category Exists");
      }else {
        this.setInputValue('error', "Internal Error");
      }
    } catch (error) {
      
    }
  }

  componentDidMount(){
    this.getPersonalCategories();
    this.getPersonalTargets();
    this.getPersonalAchievements();
  }

  render() {
    return (
      <ScreenContainer>
        <section className='account_container row'> 
          <h2>Category</h2>
          <Form onSubmit={this.onSaveCategoryHandler} className="d-flex common_search_form">
            <FormControl
              type="text"
              placeholder="Add new category"
              value={this.state.category}
              onChange={(e) => this.setInputValue('category', e.target.value)}
              required
            />
            <Button type="submit" variant="outline-success">
              <i className="fa-solid fa-plus"></i>
            </Button>
          </Form>
          {(this.state.personalCategoryList && this.state.personalCategoryList.length !== 0) ? (
            <Table hover>
            <thead>
              <tr>
                <th>Category ID</th>
                <th>Category Name</th>
              </tr>
            </thead>
            <tbody>
              {this.state.personalCategoryList &&
                this.state.personalCategoryList.length !== 0 &&
                this.state.personalCategoryList.map((cat, index) => (
                  <tr key={index}>
                    <td>
                      <span>{cat.id}</span>
                    </td>
                    <td>
                      <span>{cat.name}</span>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
          ):(<h5 className='my-3 text-center'>No Category Found</h5>)}
        </section>
        <section className='account_container row'> 
          <h2>Targets</h2>
          <Form onSubmit={this.onSaveTargetHandler} className="d-flex common_search_form">

            <Form.Select
              value={this.state.targetCategory}
              onChange={(e) => this.setInputValue('targetCategory', e.target.value)}
              required
            >
              <option defaultValue>Select Category</option>
              {this.state.personalCategoryList.length !== 0 &&
                this.state.personalCategoryList.map((cat, index) => (
                  <option key={index} value={cat.code}>
                    {cat.name}
                  </option>
                ))}
            </Form.Select>
     
            <FormControl
              type="text"
              placeholder="Add target year"
              value={this.state.targetYear}
              onChange={(e) => this.setInputValue('targetYear', e.target.value)}
              required
            />
            <FormControl
              type="text"
              placeholder="Add target amount"
              value={this.state.targetAmount}
              onChange={(e) => this.setInputValue('targetAmount', e.target.value)}
              required
            />

            <Button type="submit" variant="outline-success">
              <i className="fa-solid fa-plus"></i>
            </Button>
          </Form>
          {(this.state.personalTargetList && this.state.personalTargetList.length !== 0) ? (
            <Table hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Category</th>
                <th>Year</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {this.state.personalTargetList &&
                this.state.personalTargetList.length !== 0 &&
                this.state.personalTargetList.map((target, index) => (
                  <tr key={index}>
                    <td>
                      <span>{target.id}</span>
                    </td>
                    <td>
                      <span>{target.category}</span>
                    </td>
                    <td>
                      <span>{target.year}</span>
                    </td>
                    <td>
                      <span>{target.value}</span>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
          ): (<h5 className='my-3 text-center'>No Target Found</h5>)}
        </section>

        <section className='account_container row'> 
          <h2>Achievements</h2>
          <Form onSubmit={this.onSaveAchievementHandler} className="d-flex common_search_form">
            <Form.Select
              value={this.state.achievementCategory}
              onChange={(e) => this.setInputValue('achievementCategory', e.target.value)}
              required
            >
              <option defaultValue>Select Category</option>
              {this.state.personalCategoryList.length !== 0 &&
                this.state.personalCategoryList.map((cat, index) => (
                  <option key={index} value={cat.code}>
                    {cat.name}
                  </option>
                ))}
            </Form.Select>
     
            <FormControl
              type="text"
              placeholder="Add achievement year"
              value={this.state.achievementYear}
              onChange={(e) => this.setInputValue('achievementYear', e.target.value)}
              required
            />
            <FormControl
              type="text"
              placeholder="Add achievement amount"
              value={this.state.achievementAmount}
              onChange={(e) => this.setInputValue('achievementAmount', e.target.value)}
              required
            />

            <Button type="submit" variant="outline-success">
              <i className="fa-solid fa-plus"></i>
            </Button>
          </Form>
          <h4>Details</h4>
          {(this.state.personalAchievementList && this.state.personalAchievementList.length !== 0) ? (
            <Table hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Category</th>
                <th>Year</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {this.state.personalAchievementList &&
                this.state.personalAchievementList.length !== 0 &&
                this.state.personalAchievementList.map((achievement, index) => (
                  <tr key={index}>
                    <td>
                      <span>{index}</span>
                    </td>
                    <td>
                      <span>{achievement.category}</span>
                    </td>
                    <td>
                      <span>{achievement.year}</span>
                    </td>
                    <td>
                      <span>{achievement.amount}</span>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
          ):(<h5 className='my-3 text-center'>No Details Found</h5>)}
          <h4>Summery</h4>
          {(this.state.personalAchievementSummeryList && this.state.personalAchievementSummeryList.length !== 0) ? (
            <Table hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Category</th>
                <th>Year</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {this.state.personalAchievementSummeryList &&
                this.state.personalAchievementSummeryList.length !== 0 &&
                this.state.personalAchievementSummeryList.map((achievement, index) => (
                  <tr key={index}>
                    <td>
                      <span>{achievement.id}</span>
                    </td>
                    <td>
                      <span>{achievement.category}</span>
                    </td>
                    <td>
                      <span>{achievement.year}</span>
                    </td>
                    <td>
                      <span>{achievement.achivement}</span>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
          ):(<h5 className='my-3 text-center'>No Summery Found</h5>)}
        </section>
      </ScreenContainer>
    )
  }
}


export default PersonalCategoryScreen;
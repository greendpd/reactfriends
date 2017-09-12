import React, {Component} from 'react';
import Friend from './Friend';
import friends from './friends'

class FriendsList extends Component{
  constructor(props){
    super(props)
    this.state={
      searchText:'',
      orderBy:"name",
      order:"ascending"
    };
  }

  handleChange(field, event){
    this.setState({[field]:event.target.value});
    console.log("____________");
    console.log("HandleChange");
    console.log("FIELD");
    console.log(field);
    console.log("EVENT");
    console.log(event);
    console.log("Value");
    console.log(event.target.value);
    setTimeout(()=>{
      console.log(`State`);
      console.log(this.state[field]);
    })
  }

  render(){
    const friendsList=friends
      .filter(friend=>friend.name.toLowerCase().indexOf(this.state.searchText.toLowerCase())!==-1)
      .sort((a,b)=>a[this.state.orderBy]>b[this.state.orderBy])
      .map(friend =>(
        <Friend
          currentLocation={friend.current_location || {}}
          friendCount={friend.friend_count}
          key={friend.$$hashKey}
          name={friend.name}
          pictureUrl={friend.pic_square}
          status={friend.status ?friend.status.message:""}
        />
      ));
    const displayFriends=this.state.order==="ascending" ? friendsList:friendsList.slice().reverse();
    return <div>
    	<form className="form-inline searchForm" role="form">
    		<div className="form-group">

    			<input className="form-control" onChange={ this.handleChange.bind(this,"searchText")} placeholder="Search For Friends" value={this.state.searchText} />

            <select className="input-medium" onChange={this.handleChange.bind(this, "orderBy")} value={this.state.orderBy}>
              <option value="name">Name</option>
              <option value="friend_count">#Friends</option>
            </select>

            <select className="input-medium" onChange={this.handleChange.bind(this,"order")} value={this.state.order}>
              <option value="descending">Descending</option>
              <option value="ascending">Ascending</option>
            </select>

    		</div>
    	</form>

    	<ul>
        {displayFriends}
    	</ul>
    </div>
  }
}



export default FriendsList;
import React, { Component } from 'react'
import { View, Text, ActivityIndicator, ScrollView, TouchableOpacity } from 'react-native'
import PostCardComponent from './PostCardComponent'

export default class PageComponent extends Component{
    constructor(props) {
        super(props)
        this.state = {
            page: 1,
            displayPosts: false,
            postArray: []
        }
      }

    getDataFromApi(x){
        let URL= 'https://beta-api.betterbydesign.in/feed/wall-of-fame?page='+ x
        fetch(URL)
            .then(response => response.json())
            .then(response =>  {
                this.setState({
                    postArray: response['data']['feed'],
                })
            }).then(() => {
                this.setState({
                    displayPosts: true
                })
            })
    }

    componentDidMount(){
        this.getDataFromApi(1)
    }

    render(){
        let feedArray = this.state.postArray
      return(
            !!this.state.displayPosts ? 
            <ScrollView ref={(c) => {this.scroll = c}} style={{width: '90%'}}>
            <View style={{alignItems: 'center', padding: 20}}>
            <Text style={{fontSize: 35, color: 'orange'}}>Wall Of Fame</Text>
            </View>
            {
            feedArray.map((item, index) => {
                let videoURL = !item["coverImageUrl"].includes("https://") ? "https://betterbydesign.s3.amazonaws.com/"+item["coverImageType"]+"/"+item["coverImageUrl"] : item["coverImageUrl"]
                let imageurl = item["user"]["imageUrl"]
                imageURL = imageurl !== undefined && imageurl.includes("https://") ? imageurl : "https://betterbydesign.s3.amazonaws.com/"+imageurl
                return(
            <PostCardComponent
                key={index} 
                videoUrl={videoURL}
                postTitle={item["name"]}
                userName={item["user"]["name"]["full"]}
                profilePicture={imageURL}
                commentsArray={item["comments"]}
                reactions={item["reactions"]}
            />)})}
            <View style={{flexDirection: 'row', width: '100%',marginBottom: 20, justifyContent: 'center', alignItems: 'center'}}>
                <TouchableOpacity style={{backgroundColor: 'orange', alignItems: 'center', padding: 10, borderRadius: 5, width: '45%', justifyContent: 'center', marginRight: 5}} onPress={() => {this.getDataFromApi(1); this.scroll.scrollTo({x: 0, y: 0, animated: true})}}><Text style={{color: 'white', fontWeight: 'bold', fontSize: 20}}>Previous</Text></TouchableOpacity> 
                <TouchableOpacity style={{backgroundColor: 'orange', alignItems: 'center', padding: 10, borderRadius: 5, width: '45%', justifyContent: 'center'}} onPress={() => {this.getDataFromApi(2); this.scroll.scrollTo({x: 0, y: 0, animated: true})}}><Text style={{color: 'white', fontWeight: 'bold', fontSize: 20}}>Next</Text></TouchableOpacity> 
            </View>
            </ScrollView>
            : 
            <ActivityIndicator size="large" color= "#000000" /> 
        )
    }
}

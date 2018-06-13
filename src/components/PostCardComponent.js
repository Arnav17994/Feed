import React, { Component } from 'react'
import { View, Text, Image, TouchableOpacity, WebView } from 'react-native'

const REACTIONURL = { 
    "crazy" : require("../../assets/crazy.png"),
    "dab" : require("../../assets/dab.png"),
    "takeMyMoney" : require("../../assets/takeMyMoney.png"),
    "like" : require("../../assets/like.png"),
    "meh" : require("../../assets/meh.png"),
    "haha" : require("../../assets/meh.png")
    }

export default class PostCardComponent extends Component   {

    render(){
        const commentsArray = this.props.commentsArray
        let comments = commentsArray.map((item, index ) => {
            let URL=  item["user"]["image"]
            return (
            <View key={index} style={styles.userComponent}>
                <Image 
                source={{ uri: URL !== undefined && URL.includes("https://") ? 
                item["user"]["image"] : 
                "https://betterbydesign.s3.amazonaws.com/"+URL }} 
                style={{height: 40, width: 40, borderRadius: 4, padding: 10}} />
                <View style={{paddingLeft: 10}}>
                    <Text><Text style={{color: '#1add86', fontSize: 17}}>{item["user"]["name"]["full"]}</Text> {item["text"]}</Text>
                    <Text><Text>React </Text><Text style={{color: 'orange'}}> Reply </Text><Text> Time</Text></Text>
                </View> 
            </View>  
            ) 
        }
        )

        let collapsedView = <View>
            {comments[0]}
            {comments[1]}
            <TouchableOpacity style={{alignItems: 'center', justifyContent: 'center', padding: 13 }} onPress={()=>expandedView}>
            <Text>Show all comments</Text>
            </TouchableOpacity>
        </View>

        let expandedView = <View>
            {comments}
            <TouchableOpacity style={{alignItems: 'center', justifyContent: 'center', padding: 13 }} onPress={()=>collapsedView}>
            <Text>Collapse comments section</Text>
            </TouchableOpacity>
        </View>

        let reactionObj = this.props.reactions
        let keyArray = Object.keys(this.props.reactions)
        let reactionArray = []
        keyArray.map((item, index) => {
            if(reactionObj[item].length !== 0){
                reactionArray.push([item, reactionObj[item].length, REACTIONURL[item]])
            }
            return reactionArray
        })
        let reactionsComponentArray = reactionArray.map((item, index) => {
            return(
                <View key={index} style={styles.reactions}>
                    <Image 
                    source={item[2]}  
                    style={{width: 25, height: 25}} />
                    <Text>{item[1]}</Text>
                </View>
            )
        })

        // RETURN STARTS HERE

        return(
            <View style={styles.postContainer}>
                <View style={styles.videoContainerWrapper}>
                <View style={styles.videoContainer}>  
                   <WebView source={{uri: this.props.videoUrl}} />
                </View>
                </View>
                <View style={styles.postDataContainer}>
                    <View style={styles.userDataContainer}>
                    <View style={{flexDirection: 'row', width: '100%'}}>
                        <Image source={{uri: this.props.profilePicture}} style={styles.profilePicture} />
                        <View>
                            <Text style={{paddingLeft: 8, fontSize: 14, color: 'orange'}}>{this.props.postTitle}</Text>
                            <Text style={{paddingLeft: 8}}>by {this.props.userName}</Text>
                        </View>
                        <Image source={require('../../assets/crown.png')} style={styles.crown} />
                    </View>
                        <View style={{flexDirection: 'row', alignItems: 'center', padding: 10}}>
                                {reactionsComponentArray}
                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <Image source={require('../../assets/comment.png')} style={{marginLeft: 5, width: 25, height: 25}}/>
                                <Text>{comments.length}</Text>
                            </View>
                        </View>
                </View>
                    <View style={styles.commentsContainer}>
                        <View style={styles.reactionComponent}>
                            <View style={{flexDirection: 'row'}}>
                                <Image source={require('../../assets/grey_like_icon.png')} style={{height: 25, width: 45}}/>
                                <Text style={{paddingLeft: 2, fontSize: 20}}>React</Text>
                            </View>
                        </View>
                        <View>
                        { !!comments.length <= 2 ? 
                        <View>
                            {comments}
                            <View style={styles.extension}>
                                <Text style={{fontSize: 15}}>No more comments</Text>
                            </View>
                        </View> :
                        <View>
                            {collapsedView}
                        </View>
                        }
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = {
    postContainer: {
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center',
        borderRadius: 20,
        width: '100%',
        marginTop: 20,
        marginBottom: 20
    },
    videoContainer: {
        backgroundColor: 'black',
        width: '85%',
        height: 200
    },
    videoContainerWrapper: {
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        backgroundColor: 'black',
        width: '100%',
        alignItems: 'center'
    },
    postDataContainer: {
        alignItems: 'center',
        borderBottomRightRadius: 20,
        borderBottomLeftRadius: 20,
        width: '100%',
        backgroundColor: 'rgb(235, 235, 235)'
    },
    userDataContainer: {
        flexDirection: 'column',
        // alignItems: 'center',
        height: 100,
        width: '95%',
        backgroundColor: 'white',
        padding: 10
    },
    commentsContainer: {
        width: '95%',
    },
    reactionComponent: {
        height: 50,
        width: '100%',
        borderBottomWidth: 1,
        borderBottomColor: '#abacad',
        padding: 10
    },
    reactions: {
        padding: 5,
        height: 25,
        width: 33,
        flexDirection: 'row',
        alignItems: 'center'
    },
    profilePicture: {
        height: 50, 
        width: 50, 
        borderRadius: 5, 
        padding: 10, 
    },
    extension: {
        alignItems: 'center', 
        justifyContent: 'center', 
        paddingBottom: 15, 
        paddingTop: 5
        },
        crown: {
            position: 'absolute', 
            right: 2, 
            height: 30, 
            width: 30
        },
        userComponent: { 
            flexDirection: 'row', 
            width: '100%', 
            paddingTop: 15, 
            paddingLeft: 15, 
            height: 85, 
            borderBottomColor: '#abacad', 
            borderBottomWidth: 1
        }
}


                                
import { View, Text, TextInput, Pressable } from "react-native";
import React, { useState } from "react";
import socket from "../utils/socket";
import { styles } from "../utils/styles";

const Modal = ({ setVisible,rooms }) => {
	const closeModal = () => setVisible(false);
	//const [groupName, setGroupName] = useState("");
const groupName = 'grp2'

	function create(){
		const data = rooms.find((elem)=>{
			return elem.name === groupName
		})

		if(data){
			console.log('already available')
			closeModal()
		}else{
			socket.emit("createRoom", groupName);
			 closeModal()
		}
		
		
	};
	create()
	return (
		<View style={styles.modalContainer}>
			{/* <Text style={styles.modalsubheading}>Enter your Group name</Text>
			<TextInput
				style={styles.modalinput}
				placeholder='Group name'
				onChangeText={(value) => setGroupName(value)}
			/>
			<View style={styles.modalbuttonContainer}>
				<Pressable style={styles.modalbutton} >
					<Text style={styles.modaltext}>CREATE</Text>
				</Pressable>
				<Pressable
					style={[styles.modalbutton, { backgroundColor: "#E14D2A" }]}
					onPress={closeModal}
				>
					<Text style={styles.modaltext}>CANCEL</Text>
				</Pressable>
			</View> */}
		</View>
	);
};

export default Modal;

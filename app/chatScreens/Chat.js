import React, { useState, useLayoutEffect, useEffect } from "react";
import { View, Text, Pressable, SafeAreaView, FlatList } from "react-native";
import { Feather } from "@expo/vector-icons";
import Modal from "../chatComponent/Modal";
import ChatComponent from "../chatComponent/ChatComponent";
import socket from "../utils/socket";
import { styles } from "../utils/styles";

const Chat = () => {
	const [visible, setVisible] = useState(false);
	const [rooms, setRooms] = useState([]);

	useLayoutEffect(() => {
		function fetchGroups() {
			fetch("http://192.168.1.72:4000/api")
				.then((res) => res.json())
				.then((data) => setRooms(data))
				.catch((err) => console.error(err));
		}
		fetchGroups();
	}, []);

	const handleCreateGroup = () => setVisible(true);

	useEffect(() => {
		socket.on("roomsList", (rooms) => {
			setRooms(rooms);
		});
		handleCreateGroup()
	}, [socket]);


	

	return (
		<SafeAreaView style={styles.chatscreen}>
			<View style={styles.chattopContainer}>
				<View style={styles.chatheader}>
					<Text style={styles.chatheading}>Chats</Text>
					<Pressable onPress={handleCreateGroup}>
						<Feather name='edit' size={24} color='green' />
					</Pressable>
				</View>
			</View>

			<View style={styles.chatlistContainer}>
				{rooms.length > 0 ? (
					<FlatList
						data={rooms}
						renderItem={({ item }) => <ChatComponent item={item} />}
						keyExtractor={(item) => item.id}
					/>
				) : (
					<View style={styles.chatemptyContainer}>
						<Text style={styles.chatemptyText}>No rooms created!</Text>
						<Text>Click the icon above to create a Chat room</Text>
					</View>
				)}
			</View>
			{visible ? <Modal setVisible={setVisible} rooms={rooms} /> : ""}
		</SafeAreaView>
	);
};

export default Chat;

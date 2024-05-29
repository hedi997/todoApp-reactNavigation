import React, { useContext, useLayoutEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Button,
  StyleSheet,
} from "react-native";
import { TodoContext } from "../context/TodoContext";

const HomeScreen = ({ navigation }) => {
  const { todos } = useContext(TodoContext);

  const activeTodos = todos.filter((todo) => !todo.completed);
  const completedTodos = todos.filter((todo) => todo.completed);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button onPress={() => navigation.navigate("AddTodo")} title="Add" />
      ),
    });
  }, [navigation]);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate("TodoDetail", { todoId: item.id })}
    >
      <Text style={styles.todoItem}>
        {/* Prepend a dot before each todo item */}
        {"\u2022"} {item.title}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>To-Do List</Text>
      <FlatList
        data={activeTodos}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={<Text>No active tasks</Text>}
      />
      <Text style={styles.header}>Done List</Text>
      <FlatList
        data={completedTodos}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={<Text>No completed tasks</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,
  },
  todoItem: {
    fontSize: 18,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
});

export default HomeScreen;

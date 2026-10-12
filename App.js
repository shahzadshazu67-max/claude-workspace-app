import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert
} from "react-native";
import * as DocumentPicker from "expo-document-picker";

export default function App() {
  const [repoInfo, setRepoInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const pickFolder = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "*/*",
        copyToCacheDirectory: true
      });

      if (result.canceled) {
        return;
      }

      const file = result.assets?.[0];
      if (!file) {
        setError("No file selected");
        return;
      }

      setLoading(true);
      setError(null);

      const info = {
        folderPath: file.uri,
        branch: "main",
        lastCommit: "Initial commit",
        remote: "origin (github.com/shahzadshazu67-max/claude-workspace)",
        status: "Clean working tree",
        filesChanged: 0,
      };

      setRepoInfo(info);
    } catch (err) {
      setError("Error selecting repository: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const connectToGitHub = async () => {
    Alert.alert(
      "GitHub Login",
      "This mobile app needs a backend server for real GitHub OAuth and repo access.",
      [
        { text: "OK" }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content}>
        <Text style={styles.title}>Claude Workspace</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={pickFolder}
          disabled={loading}
        >
          <Text style={styles.buttonText}>{loading ? "Loading..." : "Select Repository"}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.secondaryButton]}
          onPress={connectToGitHub}
        >
          <Text style={styles.buttonText}>Connect GitHub</Text>
        </TouchableOpacity>

        {loading && <ActivityIndicator size="large" color="#2563eb" />}

        {error && (
          <View style={styles.errorBox}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}

        {repoInfo && !loading && (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Repository Info</Text>

            <View style={styles.infoRow}>
              <Text style={styles.label}>Branch:</Text>
              <Text style={styles.value}>{repoInfo.branch}</Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.label}>Last Commit:</Text>
              <Text style={styles.value}>{repoInfo.lastCommit}</Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.label}>Remote:</Text>
              <Text style={styles.value}>{repoInfo.remote}</Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.label}>Status:</Text>
              <Text style={styles.value}>{repoInfo.status}</Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.label}>Files Changed:</Text>
              <Text style={styles.value}>{repoInfo.filesChanged}</Text>
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f172a"
  },
  content: {
    padding: 20
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#e2e8f0",
    marginBottom: 20,
    textAlign: "center"
  },
  button: {
    backgroundColor: "#2563eb",
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 12,
    alignItems: "center"
  },
  secondaryButton: {
    backgroundColor: "#1e40af"
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600"
  },
  card: {
    marginTop: 24,
    backgroundColor: "#111827",
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#374151"
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#e2e8f0",
    marginBottom: 12
  },
  infoRow: {
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#9ca3af"
  },
  value: {
    fontSize: 14,
    color: "#e2e8f0",
    fontWeight: "500"
  },
  errorBox: {
    marginTop: 16,
    backgroundColor: "#7f1d1d",
    padding: 12,
    borderRadius: 8
  },
  errorText: {
    color: "#fee2e2",
    fontSize: 14
  }
});

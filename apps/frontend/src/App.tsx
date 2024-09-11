const App = () => {
  return (
    <main
      style={{
        minHeight: "100dvh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
      }}
    >
      <h1>Appss</h1>
      <pre>{JSON.stringify(import.meta.env.VITE_API_URL)}</pre>
    </main>
  );
};
export default App;

import css from "./Home.module.css";

const Home: React.FC = () => {
  return (
    <main className={css.background}>
      <h1 className={css.title}>Welcome to tweets App</h1>
    </main>
  );
};

export default Home;

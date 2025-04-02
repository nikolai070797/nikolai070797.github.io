import s from "./Home.module.scss"

const Home = () => {
	return (
		<div className={s.home}>
			<p className={s.font}>
				Hello from{" "}
				<a
					href="https://github.com/yunglocokid"
					target="_blank"
					className={s.link}
				>
					yunglocokid
				</a>
			</p>
			<pre className={s.hint}>
				You can edit <span className={s.path}>src/pages/Home</span> to
				start {"<3"}!<br />
			</pre>
		</div>
	)
}

export default Home
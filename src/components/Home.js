import { useColorMode } from '@docusaurus/theme-common';
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { Typography, Grid, Modal, Box } from "@material-ui/core";
import useBaseUrl from "@docusaurus/useBaseUrl";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin, faGithub, faBilibili, faWeixin } from "@fortawesome/free-brands-svg-icons";


import { useBaseUrlUtils } from '@docusaurus/useBaseUrl';
import React, { useState } from 'react';
import Layout from "@theme/Layout";

import { useTrail, animated, useSpring } from "react-spring";
// import Project from "../components/Project";
// import Projects from "../components/Projects";
// import Contact from "../components/Contact";
import Experience from "../components/Experience";

function Home() {
  const { withBaseUrl } = useBaseUrlUtils();
  const { colorMode } = useColorMode();

  React.useEffect(() => {
    if (colorMode === 'dark') {
      document.querySelector('html').classList.add('dark');
    } else {
      document.querySelector('html').classList.remove('dark');
    }
  }, [colorMode]);

  function SocialLinks({ animatedProps, ...props }) {
    const [open, setOpen] = useState(false)
    return (
      <animated.div className="social__links" style={animatedProps}>
        <Grid container spacing={3}>
          <Grid item>
            <Typography display={"inline"} gutterBottom>
              Social Media:
            </Typography>
          </Grid>
          <Grid item>
            <a href="https://github.com/calmound" >
              <FontAwesomeIcon icon={faGithub} size="xl" />
            </a>
          </Grid>
          <Grid item>
            <a href="https://space.bilibili.com/101706573" >
              <FontAwesomeIcon icon={faBilibili} size="xl" />
            </a>
          </Grid>
          <Grid item>
            <a href="javascript:void(0)" onClick={() => setOpen(true)}>
              <FontAwesomeIcon icon={faWeixin} size="xl" />
            </a>
          </Grid>
        </Grid>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
          }}>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              微信号：sanmu1598
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <img src={useBaseUrl("img/wechat.png")} />
            </Typography>
          </Box>
        </Modal>
      </animated.div >

    );
  }

  function Description() {
    const context = useDocusaurusContext();
    const { siteConfig = {} } = context;

    const animatedHero = useSpring({
      opacity: 1,
      transform: "translateX(0)",
      from: { opacity: 0, transform: "translateX(8em)" },
      config: { mass: 2, tension: 260, friction: 30 },
      delay: 600,
    });
    const animatedTexts = useTrail(5, {
      from: { opacity: 0, transform: "translateY(3em)" },
      to: { opacity: 1, transform: "translateY(0)" },
      config: {
        mass: 3,
        friction: 45,
        tension: 460,
      },
      delay: 200,
    });

    return (
      <>
        <Grid container style={{ padding: "5%" }} className="hero">
          {/*Personal Intro */}
          <Grid item xs={12} lg={6} className="homeIntro">
            <animated.div style={animatedTexts[0]}>
              <Typography variant="h3" gutterBottom>
                你好! 我是
                <span className="intro__name"> {siteConfig.title}</span>
                {/* <Typography variant="body2">
                <span>{siteConfig.tagline}</span>
              </Typography> */}
              </Typography>
            </animated.div>
            <animated.div style={animatedTexts[1]} class='mb-3'>
              <Typography variant="body1">
                在这里我会分享各类技术栈所遇到问题与解决方案，带你了解最新的技术栈以及实际开发中如何应用，并希望我的开发经历对你有所启发。
              </Typography>
            </animated.div>
            <animated.div style={animatedTexts[2]} >
              <Typography variant="body1">
                你可以随处逛逛，查看<a href="/docs/vue/01%20%E7%8E%AF%E5%A2%83%E6%90%AD%E5%BB%BA">技术笔记</a>
              </Typography>
            </animated.div>
            &nbsp;
            &nbsp;
            <animated.div style={animatedTexts[3]}>
              <Typography variant="h6" gutterBottom>
                技能掌握:
              </Typography>
              <Typography variant="body1" gutterBottom>
                React, Vue, Node.js, Webpack, JavaScript, Python, Azure,
                etc.
              </Typography>
            </animated.div>
            &nbsp;
            <SocialLinks animatedProps={animatedTexts[4]} />
          </Grid>

          <Grid item xs={12} lg={6} className="homeImg">
            {/* <img src={useBaseUrl(image)} className="image" /> */}
            <animated.img
              src={useBaseUrl("img/bg.jpg")}
              style={animatedHero}
            />
          </Grid>
        </Grid>
        {/* Experiences section */}
        {/* <Grid>
          <Experience />
        </Grid> */}
        {/* Projects section */}
        {/* <Grid>
            <Projects />
          </Grid> */}
        {/* Contact form */}
        {/* <Grid>
            <Contact />
          </Grid> */}
      </>
    );
  }

  return (
    <div id="tailwind">
      <Description />
    </div>
  );
}

export default Home;

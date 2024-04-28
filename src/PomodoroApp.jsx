/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, FormControl, FormLabel } from '@mui/material';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import PauseCircleOutlineIcon from '@mui/icons-material/PauseCircleOutline';
import RotateLeftIcon from '@mui/icons-material/RotateLeft';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SettingsIcon from '@mui/icons-material/Settings';
import './PomodoroApp.css'; 
import alarm1 from "./assets/Putang Ina Mo.mp3"; 
import strawHatImage from "./assets/images.png"; 
import backgroundImage from './assets/map1.jpg'; 
import luffyImage from './assets/luffy.webp'; 
import zoroImage from './assets/zoro.webp'; 
import namiImage from './assets/nami.png'; 
import ussoppImage from './assets/ussopp.jpg'; 

const PomodoroApp = () => {
    const [openSettings, setOpenSettings] = useState(false);
    const [workTime, setWorkTime] = useState(25);
    const [breakTime, setBreakTime] = useState(5);
    const [notificationSound, setNotificationSound] = useState(new Audio(alarm1));
    const [timer, setTimer] = useState(null);
    const [timeLeft, setTimeLeft] = useState(workTime * 60);
    const [isWorking, setIsWorking] = useState(true);
    const [isPaused, setIsPaused] = useState(true);
    const [characterImageIndex, setCharacterImageIndex] = useState(0);
    const [characterImages, setCharacterImages] = useState([luffyImage, zoroImage, namiImage, ussoppImage]);
    const [screenHeight, setScreenHeight] = useState(window.innerHeight);
    const [isDragging, setIsDragging] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isTurningPage, setIsTurningPage] = useState(false);
    const titleRef = useRef(null);

    useEffect(() => {
      setTimeLeft(isWorking ? workTime * 60 : breakTime * 60);
    }, [workTime, breakTime, isWorking]);
  
    useEffect(() => {
      const handleResize = () => {
        setScreenHeight(window.innerHeight);
      };

      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);

    useEffect(() => {
      if (!isPaused) {
        if (timeLeft === 0) {
          handleTimerEnd();
        } else {
          const countdown = setInterval(() => {
            setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
          }, 1000);
          setTimer(countdown);
          return () => clearInterval(countdown);
        }
      }
    }, [timeLeft, isPaused]);
  
    useEffect(() => {
      let imageChangeInterval = null;
      if (!isPaused) {
        const interval = Math.min(3000, (isWorking ? workTime : breakTime) * 60 * 1000);
        imageChangeInterval = setInterval(() => {
          setCharacterImageIndex((prevIndex) => (prevIndex + 1) % characterImages.length);
        }, interval); 
      }
    
      return () => clearInterval(imageChangeInterval);
    }, [isPaused, characterImages, isWorking, workTime, breakTime]);
    
    

    useEffect(() => {
      const handleMouseMove = (event) => {
        if (!isDragging) {
          setMousePosition({ x: event.clientX, y: event.clientY });
        }
      };

      document.addEventListener('mousemove', handleMouseMove);

      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
      };
    }, [isDragging]);
  
    const handleWorkTimeChange = (event) => {
      setWorkTime(parseInt(event.target.value));
    };
  
    const handleBreakTimeChange = (event) => {
      setBreakTime(parseInt(event.target.value));
    };
  
    const handleSettingsOpen = () => {
      setOpenSettings(true);
    };
  
    const handleSettingsClose = () => {
      setOpenSettings(false);
    };
  
    const handleStartPause = () => {
      setIsPaused((prevPaused) => !prevPaused);
    };
  
    const handleReset = () => {
      clearInterval(timer);
      setTimer(null);
      setIsPaused(true);
      setTimeLeft(isWorking ? workTime * 60 : breakTime * 60);
    };
  
    const handleTimerEnd = () => {
      setIsWorking((prevIsWorking) => !prevIsWorking);
      setTimeLeft(isWorking ? breakTime * 60 : workTime * 60);
    };
  
    const handleSoundChange = (event) => {
      const selectedSound = event.target.value;
      setNotificationSound(new Audio(selectedSound));
    };
  
    const formatTime = (time) => {
      const minutes = Math.floor(time / 60);
      const seconds = time % 60;
      return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    const handlePageTurnStart = () => {
      setIsTurningPage(true);
    };

    const handlePageTurnEnd = () => {
      setIsTurningPage(false);
    };
  
    return (
      <div style={{ 
        backgroundImage: `url(${backgroundImage})`, 
        backgroundSize: 'cover', 
        backgroundRepeat: 'no-repeat', 
        backgroundPosition: 'center', 
        minHeight: '100vh',
        overflow: 'hidden',
        position: 'relative'
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '20px' }}>
          <h1 ref={titleRef} className="title-line" style={{ fontFamily: 'OnePieceFont', textShadow: '1px 1px 0 black, -1px 1px 0 black, 1px -1px 0 black, -1px -1px 0 black', marginBottom: '10px' }}>
            <div style={{ width: `${titleRef.current ? titleRef.current.offsetWidth : 'auto'}px`, height: '5px', background: '#58acf4' }}></div>
            <span style={{ color: '#58acf4' }}>P</span>
            <span style={{ color: '#58acf4' }}>o</span>
            <span style={{ color: '#58acf4' }}>m</span>
            <span style={{ color: '#58acf4', fontFamily: 'Bleeding Cowboys', fontFeatureSettings: '"ss01"' }}>o</span>
            <span style={{ color: '#58acf4' }}>d</span>
            <span style={{ color: '#58acf4', fontFamily: 'Bleeding Cowboys', fontFeatureSettings: '"ss01"' }}>o</span>
            <span style={{ color: '#58acf4' }}>r</span>
            <span style={{ color: '#58acf4', fontFamily: 'Bleeding Cowboys', fontFeatureSettings: '"ss01"' }}>o</span>
            &nbsp;
            <span style={{ color: '#58acf4' }}>D</span>
            <span style={{ color: 'red', textShadow: '1px 1px 0 black, -1px 1px 0 black, 1px -1px 0 black, -1px -1px 0 black' }}>i</span>
            <span style={{ color: '#58acf4' }}>a</span>
            <span style={{ color: '#58acf4' }}>l</span> &nbsp;
            <span style={{ color: '#58acf4' }}>P</span>
            <span style={{ color: '#58acf4', fontFamily: 'Bleeding Cowboys', fontFeatureSettings: '"ss01"' }}>o</span>
            <span style={{ color: '#58acf4' }}>s</span>
            <span style={{ color: '#58acf4' }}>E</span>
            <div style={{ width: `${titleRef.current ? titleRef.current.offsetWidth : 'auto'}px`, height: '5px', background: '#58acf4' }}></div>
          </h1>
        </div>

        <motion.div
          style={{ position: 'relative', zIndex: 0 }}
          initial={{ left: 0 }}
          animate={{ left: isTurningPage ? 20 : 0 }} 
          transition={{ duration: 0.5, ease: 'easeInOut' }} 
        >
          <motion.img 
            src={characterImages[characterImageIndex]} 
            alt={`Character Image`} 
            style={{ 
              position: 'absolute', 
              width: '200px', 
              top: '50px', 
              right: '300px',
              border: '5px solid transparent', 
              boxShadow: '0px 0px 6px black', 
              transform: `rotateX(${isTurningPage ? -20 : -10}deg) rotateY(${isTurningPage ? -20 : -10}deg) scale(${isTurningPage ? 0.85 : 0.95})`, 
            }}
            initial={{ opacity: 0 }} 
            animate={{ 
              opacity: 1, 
              x: isTurningPage ? -20 : 0, 
              rotateY: isTurningPage ? -90 : 0, 
              scale: isTurningPage ? 0.8 : 1 
            }} 
            transition={{ duration: 0.5, ease: 'linear' }} 
          />
        </motion.div>

        <div className="timer-container">
          <div className="timer" style={{ backgroundImage: `url(${strawHatImage})` }}>
            <div className="time-container" style={{ backgroundColor: 'black', padding: '5px', borderRadius: '50px', textAlign: 'center' }}>
              <div className="time-left" style={{ color: 'white', textShadow: '-1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black, 1px 1px 0 black' }}>
                {formatTime(timeLeft)}
              </div>
            </div>
          </div>

          <div className="control-buttons">
            <Button variant="contained" onClick={handleReset} style={{ backgroundColor: 'black' }}>
              <RotateLeftIcon />
            </Button>
            <Button variant="contained" onClick={handleStartPause} style={{ backgroundColor: 'black' }}>
              {isPaused ? <PlayCircleOutlineIcon /> : <PauseCircleOutlineIcon />}
            </Button>
            <Button variant="contained" onClick={handleTimerEnd} style={{ backgroundColor: 'black' }}>
              <SkipNextIcon />
            </Button>
            <Button variant="contained" onClick={handleSettingsOpen} style={{ backgroundColor: 'black' }}>
              <SettingsIcon />
            </Button>
          </div>
        </div>

        <div style={{ 
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'fixed',
          bottom: '0',
          left: '0',
          right: '0',
          color: 'black',
          fontFamily: 'Comic Sans MS',
          fontSize: '20px',
          textDecoration: 'underline' 
        }}>
          Made with love by Bryan Lomerio
        </div>

        <Dialog open={openSettings} onClose={handleSettingsClose}>
          <DialogTitle>Settings</DialogTitle>     
          <DialogContent>
            <FormControl style={{ marginLeft: '10px' }}>
              <FormLabel>Focus Time</FormLabel>
              <select onChange={handleWorkTimeChange} value={workTime}>
                <option value={25}>25 minutes</option>
                <option value={30}>30 minutes</option>
                <option value={45}>45 minutes</option>
                <option value={60}>60 minutes</option>
                <option value={85}>1 hour 25 minutes</option>
                <option value={120}>2 hours</option>
              </select>
            </FormControl>
            <FormControl style={{ marginLeft: '10px' }}>
              <FormLabel>Break Time</FormLabel>
              <select onChange={handleBreakTimeChange} value={breakTime}>
                <option value={5}>5 minutes</option>
                <option value={10}>10 minutes</option>
                <option value={60}>1 hour</option>
              </select>
            </FormControl>
            <FormControl style={{ marginLeft: '10px' }}>
              <FormLabel>Notification Sound</FormLabel>
              <select onChange={handleSoundChange} value={notificationSound}>
                <option value={alarm1}>Putang Inamo</option>
              </select>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleSettingsClose}>Ok</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
};

export default PomodoroApp;
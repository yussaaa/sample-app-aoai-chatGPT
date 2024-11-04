import React from 'react';
import { Lock, MessageSquare, BarChart2 } from 'react-feather';
import styles from './Home.module.css';

import azureLogo from '../../assets/azure-svgrepo-com.svg'
import openaiLogo from '../../assets/openai-svgrepo-com.svg'
import pythonLogo from '../../assets/python-svgrepo-com.svg'
import langchainLogo from '../../assets/langchain-seeklogo.svg'
import torontoHydroLogo from '../../assets/toronto-hydro-logo.png'
interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const Home: React.FC = () => {
  const features: Feature[] = [
    {
      icon: <Lock className={styles.icon} />,
      title: "Protection",
      description: "Ensure only authorized users can access and interact with specific chatbots and document libraries, hence safeguarding sensitive data."
    },
    {
      icon: <MessageSquare className={styles.icon} />,
      title: "Chat with Documents",
      description: "Interact with your documents in a conversational manner, including tables and images."
    },
    {
      icon: <BarChart2 className={styles.icon} />,
      title: "Analytics Engine for Tracking AI Effectiveness",
      description: "Gain insights into the performance and effectiveness of AI models."
    }
  ];

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <h1 className={styles.welcomeText}>Welcome to the Gen AI Lab!</h1>
          <img 
            src={torontoHydroLogo}
            alt="Toronto Hydro" 
            className={styles.companyLogo}
          />
        </div>
        <div className={styles.featureList}>
          {features.map((feature, index) => (
            <div key={index} className={styles.featureCard}>
              <div className={styles.iconWrapper}>
                {feature.icon}
              </div>
              <div>
                <h2 className={styles.title}>
                  {feature.title}
                </h2>
                <p className={styles.description}>
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
        
        <div className={styles.footer}>
          <p className={styles.poweredBy}>
            Powered by
            <img src={azureLogo} alt="Azure" className={styles.logo} />
            <img src={openaiLogo} alt="OpenAI" className={styles.logo} />
            <img src={pythonLogo} alt="Python" className={styles.logo} />
            <img src={langchainLogo} alt="Langchain" className={styles.logo} />
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
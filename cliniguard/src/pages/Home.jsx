import React from 'react'
import { motion } from 'framer-motion'
import styled, { createGlobalStyle } from 'styled-components'
import { ArrowRight, Clock, Clipboard, Users, Brain, HeartPulse, Stethoscope, Calendar, FileText } from "lucide-react"
import { Image } from 'lucide-react'

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: 'Arial', sans-serif;
    background: linear-gradient(to bottom, #172554, #1e3a8a);
    color: #ffffff;
  }
`

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
`

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  border-bottom: 1px solid #1e40af;
`

const Logo = styled(motion.a)`
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #ffffff;
  font-weight: bold;
  font-size: 1.5rem;
`

const Nav = styled.nav`
  display: flex;
  gap: 1rem;
`

const NavButton = styled(motion.button)`
  background: none;
  border: none;
  color: #bfdbfe;
  font-size: 1rem;
  cursor: pointer;
  padding: 0.5rem 1rem;
  transition: background-color 0.3s;

  &:hover {
    background-color: #1e40af;
    color: #ffffff;
  }
`

const Section = styled.section`
  padding: 4rem 0;
`

const FlexContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
`

const HeroContent = styled.div`
  flex: 1;
`

const HeroTitle = styled(motion.h1)`
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 1rem;
  background: linear-gradient(to right, #7dd3fc, #3b82f6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  @media (min-width: 768px) {
    font-size: 4rem;
  }
`

const HeroDescription = styled(motion.p)`
  font-size: 1.2rem;
  color: #bfdbfe;
  margin-bottom: 2rem;
`

const Button = styled(motion.button)`
  background-color: #0284c7;
  color: #ffffff;
  border: none;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0369a1;
  }
`

const FeatureGrid = styled.div`
  display: grid;
  gap: 1.5rem;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
`

const FeatureCard = styled(motion.div)`
  background-color: #1e3a8a;
  padding: 1.5rem;
  border-radius: 0.5rem;
  height: 100%;
`

const FeatureIcon = styled.div`
  color: #7dd3fc;
  margin-bottom: 1rem;
`

const FeatureTitle = styled.h3`
  font-size: 1.2rem;
  color: #bfdbfe;
  margin-bottom: 0.5rem;
`

const FeatureDescription = styled.p`
  color: #93c5fd;
`

const StepGrid = styled.div`
  display: grid;
  gap: 1.5rem;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
`

const StepCard = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`

const StepIcon = styled.div`
  background-color: #0284c7;
  color: #ffffff;
  padding: 1rem;
  border-radius: 50%;
  margin-bottom: 1rem;
`

const StepTitle = styled.h3`
  font-size: 1.2rem;
  color: #7dd3fc;
  margin-bottom: 0.5rem;
`

const StepDescription = styled.p`
  color: #bfdbfe;
`

const TestimonialGrid = styled.div`
  display: grid;
  gap: 1.5rem;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
`

const TestimonialCard = styled.div`
  background-color: #1e3a8a;
  padding: 1.5rem;
  border-radius: 0.5rem;
`

const TestimonialContent = styled.p`
  color: #bfdbfe;
  margin-bottom: 1rem;
`

const TestimonialAuthor = styled.p`
  font-weight: bold;
  color: #7dd3fc;
`

const TestimonialRole = styled.p`
  color: #93c5fd;
  font-size: 0.9rem;
`

const Footer = styled.footer`
  background-color: #172554;
  padding: 1.5rem 0;
`

const FooterContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
  }
`

const FooterLogo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #ffffff;
  font-weight: bold;
`

const FooterNav = styled.nav`
  display: flex;
  gap: 1rem;
`

const FooterLink = styled.a`
  color: #bfdbfe;
  text-decoration: none;
  font-size: 0.9rem;

  &:hover {
    text-decoration: underline;
  }
`

export default function Home() {
  return (
    <>
      <GlobalStyle />
      <Header>
        <Logo href="#" whileHover={{ scale: 1.1 }}>
          <HeartPulse size={32} color="#7dd3fc" />
          <span>CliniGuard</span>
        </Logo>
        <Nav>
          {["Features", "About", "Testimonials", "Contact"].map((item) => (
            <NavButton key={item} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              {item}
            </NavButton>
          ))}
        </Nav>
      </Header>

      <main>
        <Section>
          <Container>
            <FlexContainer>
              <HeroContent>
                <HeroTitle
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  Revolutionize Your Clinic Operations
                </HeroTitle>
                <HeroDescription
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  CliniGuard: A comprehensive web application to empower healthcare providers, 
                  enhance patient care, and streamline your entire clinical workflow.
                </HeroDescription>
                <Button
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  Get Started <ArrowRight size={16} />
                </Button>
              </HeroContent>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Image
                  src="/placeholder.svg?height=400&width=400"
                  alt="CliniGuard Dashboard"
                  width={400}
                  height={400}
                  style={{ borderRadius: '0.5rem', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}
                />
              </motion.div>
            </FlexContainer>
          </Container>
        </Section>

        <Section style={{ backgroundColor: '#1e3a8a' }}>
          <Container>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', textAlign: 'center', marginBottom: '3rem', color: '#7dd3fc' }}>
              Key Features
            </h2>
            <FeatureGrid>
              {[
                { icon: Clock, title: "Efficiency", description: "Automate administrative and clinical processes, reducing staff workload and streamlining operations." },
                { icon: Clipboard, title: "Accuracy", description: "Centralized digital records with real-time data sync ensure consistent, up-to-date patient information." },
                { icon: Users, title: "Accessibility", description: "Patient portal and online appointment booking system enhance accessibility for patients." },
                { icon: Brain, title: "AI Integration", description: "AI-driven predictive analysis, personalized diet recommendations, and a medical chatbot for advanced healthcare solutions." }
              ].map((feature, index) => (
                <FeatureCard
                  key={feature.title}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FeatureIcon>
                    <feature.icon size={32} />
                  </FeatureIcon>
                  <FeatureTitle>{feature.title}</FeatureTitle>
                  <FeatureDescription>{feature.description}</FeatureDescription>
                </FeatureCard>
              ))}
            </FeatureGrid>
          </Container>
        </Section>

        <Section>
          <Container>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', textAlign: 'center', marginBottom: '3rem', color: '#7dd3fc' }}>
              How It Works
            </h2>
            <StepGrid>
              {[
                { icon: Calendar, title: "Schedule", description: "Easily manage appointments and patient flow" },
                { icon: Stethoscope, title: "Treat", description: "Access patient records and provide care efficiently" },
                { icon: FileText, title: "Follow-up", description: "Automate follow-ups and maintain patient engagement" }
              ].map((step, index) => (
                <StepCard
                  key={step.title}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                >
                  <StepIcon>
                    <step.icon size={24} />
                  </StepIcon>
                  <StepTitle>{step.title}</StepTitle>
                  <StepDescription>{step.description}</StepDescription>
                </StepCard>
              ))}
            </StepGrid>
          </Container>
        </Section>

        <Section style={{ backgroundColor: '#1e3a8a' }}>
          <Container>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', textAlign: 'center', marginBottom: '3rem', color: '#7dd3fc' }}>
              What Our Users Say
            </h2>
            <TestimonialGrid>
              {[
                { name: "Dr. Emily Chen", role: "General Practitioner", content: "CliniGuard has transformed our clinic's efficiency. We've reduced wait times and improved patient satisfaction significantly." },
                { name: "Mark Johnson", role: "Clinic Administrator", content: "The automated billing and scheduling features have saved us countless hours. It's an indispensable tool for modern healthcare management." },
                { name: "Sarah Thompson", role: "Patient", content: "I love being able to book appointments and access my medical records online. It makes managing my health so much easier." }
              ].map((testimonial, index) => (
                <TestimonialCard key={index}>
                  <TestimonialContent>"{testimonial.content}"</TestimonialContent>
                  <TestimonialAuthor>{testimonial.name}</TestimonialAuthor>
                  <TestimonialRole>{testimonial.role}</TestimonialRole>
                </TestimonialCard>
              ))}
            </TestimonialGrid>
          </Container>
        </Section>

        <Section>
          <Container>
            <FlexContainer>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                style={{ flex: 1 }}
              >
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  alt="CliniGuard in action"
                  width={600}
                  height={400}
                  style={{ borderRadius: '0.5rem', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}
                />
              </motion.div>
              <div style={{ flex: 1 }}>
                <motion.h2 
                  style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#7dd3fc', marginBottom: '1rem' }}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  Ready to Transform Your Clinic?
                </motion.h2>
                <motion.p 
                  style={{ color: '#bfdbfe', fontSize: '1.2rem', marginBottom: '2rem' }}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  Join thousands of healthcare providers who have already revolutionized their practice with CliniGuard.
                </motion.p>
                <Button
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  Start Your Free Trial <ArrowRight size={16} />
                </Button>
              </div>
            </FlexContainer>
          </Container>
        </Section>
      </main>

      <Footer>
        <Container>
          <FooterContent>
            <FooterLogo>
              <HeartPulse size={24} color="#7dd3fc" />
              <span>CliniGuard</span>
            </FooterLogo>
            <FooterNav>
              {["Terms", "Privacy", "Contact"].map((item) => (
                <FooterLink key={item} href="#">
                  {item}
                </FooterLink>
              ))}
            </FooterNav>
          </FooterContent>
        </Container>
      </Footer>
    </>
  )
}
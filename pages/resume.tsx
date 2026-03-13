import React, { useRef, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { styled } from '../stitches.config';

const ResumeContainer = styled('div', {
  minHeight: '100vh',
  backgroundColor: '#f8fafc',
  padding: '40px 20px',
  '@media print': {
    backgroundColor: 'white',
    padding: '0',
  }
});

const ControlPanel = styled('div', {
  maxWidth: '800px',
  margin: '0 auto 24px auto',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '0 16px',
  '@media print': {
    display: 'none',
  },
  variants: {
    editMode: {
      false: {
        display: 'none',
      }
    }
  }
});

const TipText = styled('p', {
  fontSize: '$sm',
  color: '#64748b',
  margin: 0,
});

const PrintButton = styled('button', {
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  backgroundColor: '$primary',
  color: 'white',
  padding: '12px 16px',
  borderRadius: '8px',
  border: 'none',
  cursor: 'pointer',
  fontSize: '$sm',
  fontWeight: '600',
  transition: 'all 0.2s',
  '&:hover': {
    backgroundColor: '#1ab653',
    transform: 'translateY(-1px)',
  }
});

const ResumeSheet = styled('div', {
  maxWidth: '800px',
  margin: '0 auto',
  backgroundColor: 'white',
  boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  padding: '48px',
  borderRadius: '8px',
  minHeight: '29.7cm',
  '@media print': {
    boxShadow: 'none',
    padding: '32px',
    borderRadius: '0',
  }
});

const Header = styled('header', {
  borderBottom: '3px solid #1e293b',
  paddingBottom: '24px',
  marginBottom: '32px',
});

const Name = styled('h1', {
  fontSize: '2.5rem',
  fontWeight: '800',
  color: '#1e293b',
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
  margin: '0',
  outline: 'none',
  '&:focus': {
    backgroundColor: '#f0f9ff',
    borderRadius: '4px',
    padding: '2px 4px',
  }
});

const ContactInfo = styled('div', {
  marginTop: '16px',
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: '8px',
  fontSize: '$sm',
  color: '#64748b',
});

const ContactItem = styled('span', {
  outline: 'none',
  color: '#64748b',
  '&:focus': {
    backgroundColor: '#f0f9ff',
    borderRadius: '4px',
    padding: '2px 4px',
  }
});

const Summary = styled('section', {
  marginBottom: '32px',
});

const SummaryText = styled('p', {
  color: '#475569',
  lineHeight: '1.6',
  fontStyle: 'italic',
  fontSize: '$default',
  margin: '0',
  outline: 'none',
  '&:focus': {
    backgroundColor: '#f0f9ff',
    borderRadius: '4px',
    padding: '4px',
  }
});

const MainGrid = styled('div', {
  display: 'grid',
  gridTemplateColumns: '2fr 1fr',
  gap: '32px',
});

const MainContent = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '32px',
});

const Sidebar = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '32px',
});

const Section = styled('section', {});

const SectionTitle = styled('h2', {
  fontSize: '$lg',
  fontWeight: '800',
  color: '#1e293b',
  textTransform: 'uppercase',
  borderBottom: '1px solid #e2e8f0',
  marginBottom: '16px',
  paddingBottom: '4px',
  margin: '0 0 16px 0',
});

const SectionHeader = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '16px',
});

const AddButton = styled('button', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '28px',
  height: '28px',
  borderRadius: '50%',
  border: '2px solid $primary',
  backgroundColor: 'transparent',
  color: '$primary',
  cursor: 'pointer',
  fontSize: '16px',
  fontWeight: 'bold',
  transition: 'all 0.2s',
  '&:hover': {
    backgroundColor: '$primary',
    color: 'white',
    transform: 'scale(1.1)',
  },
  '&:active': {
    transform: 'scale(0.95)',
  },
  '@media print': {
    display: 'none',
  },
  variants: {
    editMode: {
      false: {
        display: 'none',
      }
    }
  }
});

const RemoveButton = styled('button', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '20px',
  height: '20px',
  borderRadius: '50%',
  border: '1px solid #ef4444',
  backgroundColor: 'transparent',
  color: '#ef4444',
  cursor: 'pointer',
  fontSize: '12px',
  fontWeight: 'bold',
  transition: 'all 0.2s',
  marginLeft: '8px',
  '&:hover': {
    backgroundColor: '#ef4444',
    color: 'white',
    transform: 'scale(1.1)',
  },
  '&:active': {
    transform: 'scale(0.95)',
  },
  '@media print': {
    display: 'none',
  },
  variants: {
    editMode: {
      false: {
        display: 'none',
      }
    }
  }
});

const JobItem = styled('div', {
  marginBottom: '24px',
});

const JobHeader = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '8px',
});

const JobTitleContainer = styled('div', {
  display: 'flex',
  alignItems: 'center',
  flex: 1,
  justifyContent: 'space-between',
});

const JobTitle = styled('h3', {
  fontSize: '$md',
  fontWeight: '700',
  color: '#1e293b',
  margin: '0',
  outline: 'none',
  '&:focus': {
    backgroundColor: '#f0f9ff',
    borderRadius: '4px',
    padding: '2px 4px',
  }
});

const JobDate = styled('span', {
  fontSize: '$sm',
  color: '#64748b',
  fontWeight: '500',
  outline: 'none',
  '&:focus': {
    backgroundColor: '#f0f9ff',
    borderRadius: '4px',
    padding: '2px 4px',
  }
});

const JobDescription = styled('ul', {
  listStyle: 'disc',
  marginLeft: '20px',
  marginTop: '8px',
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
  fontSize: '$sm',
  color: '#475569',
  margin: '8px 0 0 20px',
  padding: '0',
});

const JobDescriptionItem = styled('li', {
  outline: 'none',
  '&:focus': {
    backgroundColor: '#f0f9ff',
    borderRadius: '4px',
    padding: '2px 4px',
  }
});

const SkillsContainer = styled('div', {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '8px',
});

const SkillContainer = styled('div', {
  display: 'flex',
  alignItems: 'center',
  position: 'relative',
});

const CertificationContainer = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
});

const SkillTag = styled('span', {
  backgroundColor: '#f1f5f9',
  color: '#334155',
  padding: '6px 12px',
  borderRadius: '16px',
  fontSize: '$xs',
  fontWeight: '600',
  outline: 'none',
  transition: 'all 0.2s',
  border: '1px solid #e2e8f0',
  '&:focus': {
    backgroundColor: '$primary',
    borderColor: '$primary',
  },
  '&:hover': {
    backgroundColor: '#e2e8f0',
    borderColor: '#cbd5e1',
  }
});

const EducationContent = styled('div', {
  fontSize: '$sm',
});

const EducationInstitution = styled('p', {
  fontWeight: '700',
  color: '#1e293b',
  margin: '0',
  outline: 'none',
  '&:focus': {
    backgroundColor: '#f0f9ff',
    borderRadius: '4px',
    padding: '2px 4px',
  }
});

const EducationDegree = styled('p', {
  color: '#64748b',
  margin: '4px 0',
  outline: 'none',
  '&:focus': {
    backgroundColor: '#f0f9ff',
    borderRadius: '4px',
    padding: '2px 4px',
  }
});

const EducationDate = styled('p', {
  color: '#64748b',
  fontStyle: 'italic',
  margin: '0',
  outline: 'none',
  '&:focus': {
    backgroundColor: '#f0f9ff',
    borderRadius: '4px',
    padding: '2px 4px',
  }
});

const CertificationsList = styled('div', {
  fontSize: '$xs',
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
});

const CertificationItem = styled('p', {
  margin: '0',
  color: '#475569',
  outline: 'none',
  '&:focus': {
    backgroundColor: '#f0f9ff',
    borderRadius: '4px',
    padding: '2px 4px',
  }
});

const ResumePage = () => {
  const resumeRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    // Check if edit=true is in the URL
    setIsEditMode(router.query.edit === 'true');
  }, [router.query.edit]);
  const [experiences, setExperiences] = useState([
    {
      id: 0,
      title: 'Jusbrasil - Software Engineer',
      date: '10/2025 - Present',
      description: [
        'Working as a Full Stack Software Engineer at Jusbrasil. I am part of the JusIA Activation Team.',
        'Main stack includes NextJS, Node, PostgreSQL, GraphQL, GCP.'
      ]
    },
    {
      id: 1,
      title: 'Hotmart - Software Engineer',
      date: '05/2022 - 10/2025',
      description: [
        'Contribute to development of critical and highly available systems handling millions of users.',
        'Apply advanced monitoring techniques (Kibana, New Relic) to ensure optimal performance and reliability.',
        'Collaborate closely with DevOps and QA teams for efficient and secure solution delivery.',
        'Lead evolution of frontend testing structures and implement industry best practices.',
        'Mentor junior developers and contribute to technical architecture decisions.'
      ]
    },
    {
      id: 2,
      title: 'Cia. Hering - Software Engineer',
      date: '03/2021 - 05/2022',
      description: [
        'Developed innovative features for the brand\'s e-commerce platform using React and GraphQL.',
        'Worked closely with cross-functional product teams to translate user needs into scalable technical solutions.',
        'Improved site performance and user experience through code optimization and modern web practices.'
      ]
    },
    {
      id: 2,
      title: 'Codeby - Software Engineer',
      date: '10/2020 - 05/2022',
      description: [
        'Working in the development and maintenance of e-commerces. Guiding the team on technical issues and project planning.',
        'Working mainly with technologies such as React, Koa.js, GraphQL, Vtex IO, Typescript, Sass. Application of performance and performance improvements.',
      ]
    },
  ]);

  const [skills, setSkills] = useState([
    'React.js', 'TypeScript', 'Node.js', 'GraphQL', 'Next.js',
    'Jest', 'Docker', 'AWS', 'Kubernetes', 'MongoDB',
    'PostgreSQL', 'Redis', 'Git', 'CI/CD', 'Microservices'
  ]);

  const [certifications, setCertifications] = useState([
    'React: Testing and Debugging (Dan Abramov)',
    'React: Server-Side Rendering (Egghead)',
    'AWS Cloud Practitioner Essentials',
    'GraphQL with React: The Complete Guide'
  ]);

  const [languages, setLanguages] = useState([
    'Portuguese - Native',
    'English - Intermediate',
  ]);

  const handlePrint = () => {
    window.print();
  };

  const addExperience = () => {
    const newExp = {
      id: Date.now(),
      title: 'New Company - Job Title',
      date: 'MM/YYYY - MM/YYYY',
      description: ['Click to edit job description...']
    };
    setExperiences([...experiences, newExp]);
  };

  const removeExperience = (id: number) => {
    setExperiences(experiences.filter(exp => exp.id !== id));
  };

  const addSkill = () => {
    setSkills([...skills, 'New Skill']);
  };

  const removeSkill = (index: number) => {
    setSkills(skills.filter((_, i) => i !== index));
  };

  const addCertification = () => {
    setCertifications([...certifications, 'New Certification']);
  };

  const removeCertification = (index: number) => {
    setCertifications(certifications.filter((_, i) => i !== index));
  };

  const addLanguage = () => {
    setLanguages([...languages, '🌍 New Language - Level']);
  };

  const removeLanguage = (index: number) => {
    setLanguages(languages.filter((_, i) => i !== index));
  };

  return (
    <ResumeContainer>
      <ControlPanel editMode={isEditMode}>
        <PrintButton onClick={handlePrint}>
          Salvar PDF
        </PrintButton>
      </ControlPanel>

      <ResumeSheet ref={resumeRef}>
        <Header>
          <Name 
            contentEditable={isEditMode} 
            suppressContentEditableWarning={true}
            style={{ cursor: isEditMode ? 'text' : 'default' }}
          >
            Breno Gonçalves Cota
          </Name>
          <ContactInfo>
            <ContactItem 
              contentEditable={isEditMode} 
              suppressContentEditableWarning={true}
              style={{ cursor: isEditMode ? 'text' : 'default' }}
            >
              Belo Horizonte, MG
            </ContactItem>
            <ContactItem 
              contentEditable={isEditMode} 
              suppressContentEditableWarning={true}
              style={{ cursor: isEditMode ? 'text' : 'default' }}
            >
              (31) 99988-2630
            </ContactItem>
            <ContactItem 
              contentEditable={isEditMode} 
              suppressContentEditableWarning={true}
              style={{ cursor: isEditMode ? 'text' : 'default' }}
            >
              brenocota4@gmail.com
            </ContactItem>
            <ContactItem 
              contentEditable={isEditMode} 
              suppressContentEditableWarning={true}
              style={{ cursor: isEditMode ? 'text' : 'default' }}
            >
              linkedin.com/in/breno-cota
            </ContactItem>
          </ContactInfo>
        </Header>

        <Summary>
          <SummaryText 
            contentEditable={isEditMode} 
            suppressContentEditableWarning={true}
            style={{ cursor: isEditMode ? 'text' : 'default' }}
          >
            I&apos;m a Software Engineer passionate about learning and creating solutions that help digital content creators realize their dreams. Currently at Hotmart, developing critical and high availability systems with cutting-edge technologies.
          </SummaryText>
        </Summary>

        <MainGrid>
          <MainContent>
            <Section>
              <SectionHeader>
                <SectionTitle>Experience</SectionTitle>
                <AddButton 
                  onClick={addExperience} 
                  title="Add new experience"
                  editMode={isEditMode}
                >
                  +
                </AddButton>
              </SectionHeader>
              
              {experiences.map((exp) => (
                <JobItem key={exp.id}>
                  <JobHeader>
                    <JobTitleContainer>
                      <JobTitle 
                        contentEditable={isEditMode} 
                        suppressContentEditableWarning={true}
                        style={{ cursor: isEditMode ? 'text' : 'default' }}
                      >
                        {exp.title}
                      </JobTitle>
                      <RemoveButton
                        onClick={() => removeExperience(exp.id)}
                        title="Remove experience"
                        editMode={isEditMode}
                      >
                        ×
                      </RemoveButton>
                    </JobTitleContainer>
                    <JobDate 
                      contentEditable={isEditMode} 
                      suppressContentEditableWarning={true}
                      style={{ cursor: isEditMode ? 'text' : 'default' }}
                    >
                      {exp.date}
                    </JobDate>
                  </JobHeader>
                  <JobDescription>
                    {exp.description.map((desc, index) => (
                      <JobDescriptionItem 
                        key={index} 
                        contentEditable={isEditMode} 
                        suppressContentEditableWarning={true}
                        style={{ cursor: isEditMode ? 'text' : 'default' }}
                      >
                        {desc}
                      </JobDescriptionItem>
                    ))}
                  </JobDescription>
                </JobItem>
              ))}
            </Section>
          </MainContent>

          <Sidebar>
            <Section>
              <SectionHeader>
                <SectionTitle>Technical Skills</SectionTitle>
                <AddButton 
                  onClick={addSkill} 
                  title="Add new skill"
                  editMode={isEditMode}
                >
                  +
                </AddButton>
              </SectionHeader>
              <SkillsContainer>
                {skills.map((skill, index) => (
                  <SkillContainer key={index}>
                    <SkillTag 
                      contentEditable={isEditMode}
                      suppressContentEditableWarning={true}
                      style={{ cursor: isEditMode ? 'text' : 'default' }}
                    >
                      {skill}
                    </SkillTag>
                    <RemoveButton
                      onClick={() => removeSkill(index)}
                      title="Remove skill"
                      editMode={isEditMode}
                      style={{ marginLeft: '4px' }}
                    >
                      ×
                    </RemoveButton>
                  </SkillContainer>
                ))}
              </SkillsContainer>
            </Section>

            <Section>
              <SectionTitle>Education</SectionTitle>
              <EducationContent>
                <EducationInstitution 
                  contentEditable={isEditMode} 
                  suppressContentEditableWarning={true}
                  style={{ cursor: isEditMode ? 'text' : 'default' }}
                >
                  IFNMG - Instituto Federal do Norte de Minas Gerais
                </EducationInstitution>
                <EducationDegree 
                  contentEditable={isEditMode} 
                  suppressContentEditableWarning={true}
                  style={{ cursor: isEditMode ? 'text' : 'default' }}
                >
                  Technology in Systems Analysis and Development
                </EducationDegree>
                <EducationDate 
                  contentEditable={isEditMode} 
                  suppressContentEditableWarning={true}
                  style={{ cursor: isEditMode ? 'text' : 'default' }}
                >
                  2018 - 2020
                </EducationDate>
              </EducationContent>
            </Section>

            <Section>
              <SectionHeader>
                <SectionTitle>Certifications</SectionTitle>
                <AddButton 
                  onClick={addCertification} 
                  title="Add new certification"
                  editMode={isEditMode}
                >
                  +
                </AddButton>
              </SectionHeader>
              <CertificationsList>
                {certifications.map((cert, index) => (
                  <CertificationContainer key={index}>
                    <CertificationItem 
                      contentEditable={isEditMode} 
                      suppressContentEditableWarning={true}
                      style={{ cursor: isEditMode ? 'text' : 'default', flex: 1 }}
                    >
                      {cert}
                    </CertificationItem>
                    <RemoveButton
                      onClick={() => removeCertification(index)}
                      title="Remove certification"
                      editMode={isEditMode}
                    >
                      ×
                    </RemoveButton>
                  </CertificationContainer>
                ))}
              </CertificationsList>
            </Section>

            <Section>
              <SectionHeader>
                <SectionTitle>Languages</SectionTitle>
                <AddButton 
                  onClick={addLanguage} 
                  title="Add new language"
                  editMode={isEditMode}
                >
                  +
                </AddButton>
              </SectionHeader>
              <CertificationsList>
                {languages.map((language, index) => (
                  <CertificationContainer key={index}>
                    <CertificationItem 
                      contentEditable={isEditMode} 
                      suppressContentEditableWarning={true}
                      style={{ cursor: isEditMode ? 'text' : 'default', flex: 1 }}
                    >
                      {language}
                    </CertificationItem>
                    <RemoveButton
                      onClick={() => removeLanguage(index)}
                      title="Remove language"
                      editMode={isEditMode}
                    >
                      ×
                    </RemoveButton>
                  </CertificationContainer>
                ))}
              </CertificationsList>
            </Section>
          </Sidebar>
        </MainGrid>
      </ResumeSheet>

      <style jsx global>{`
        @media print {
          body { 
            background: none !important; 
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          @page { 
            margin: 0.5in; 
            size: A4;
          }
          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
        }
        
        ${isEditMode ? `
        [contenteditable]:hover {
          background-color: #f8fafc !important;
          border-radius: 4px;
          outline: 1px dashed #cbd5e1;
        }
        
        [contenteditable]:focus {
          background-color: #f0f9ff !important;
          border-radius: 4px;
          outline: 2px solid #3b82f6;
        }
        ` : ''}
      `}</style>
    </ResumeContainer>
  );
};

export default ResumePage;
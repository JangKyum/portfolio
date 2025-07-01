"use client"

import React, { useEffect, useState, useRef } from "react"
import Image from "next/image"
import { Github, ExternalLink, FileText, ArrowUpRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion, useInView, useScroll, useTransform } from "framer-motion"

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("home")
  const [isDarkTheme, setIsDarkTheme] = useState(false)
  
  const projectImages = [
    { src: "/img/book.jpg", alt: "📚 책이 있는 시간이 좋아요", size: { width: 190, height: 320 } },
    { src: "/img/running.jpg", alt: "🏃 몸도 마음도 가벼워지는 시간", size: { width: 190, height: 320 } },
    { src: "/img/chue.jpg", alt: "🐶 츄랑 노는 게 제일 재밌어요", size: { width: 250, height: 320 } },
    { src: "/img/movie.jpg", alt: "🎬 좋은 영화는 언제 봐도 좋다", size: { width: 200, height: 320 } },
    { src: "/img/travel.JPG", alt: "🌍 새로운 풍경이 주는 리프레시", size: { width: 250, height: 320 } },
  ]

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
    
      const projectElement = document.getElementById("project")
      const workElement = document.getElementById("work-experience")
      
      if (projectElement && workElement) {
        const projectTop = projectElement.offsetTop
        const workTop = workElement.offsetTop
        
        if (scrollPosition + 500 >= projectTop) {
          setActiveSection("project")
          setIsDarkTheme(false)
          console.log("Changed to Projects - Light theme")
        }
        else if (scrollPosition + 500 >= workTop) {
          setActiveSection("work-experience")
          setIsDarkTheme(true)
          console.log("Changed to Work Experience - Dark theme")
        }
        else {
          const sections = ["home", "skills", "education"]
          for (const sectionId of sections) {
            const element = document.getElementById(sectionId)
            if (element) {
              const offsetTop = element.offsetTop
              const offsetHeight = element.offsetHeight

              if (scrollPosition >= offsetTop - 100 && scrollPosition < offsetTop + offsetHeight + 100) {
                setActiveSection(sectionId)
                setIsDarkTheme(false)
                console.log(`Changed to ${sectionId} - Light theme`)
                break
              }
            }
          }
        }
      }
    }

    handleScroll()
    
    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const workExperiences = [
    {
      title: "CIS(CywellSystem Information System)",
      period: "2024.12 ~ 2025.04 (5개월)",
      role: "사내 영업/엔지니어 활동 관리 시스템 기능 고도화 및 안정화 (프론트엔드 담당)",
      achievements: [
        "정기점검 모듈 개선: 기존 수기 입력 방식으로 인한 오류를 줄이기 위해 점검주기 자동 계산, 상태 시각화 기능 도입.",
        "UI/UX 리팩토링: 버튼 조건 분리 및 날짜 자동 설정으로 사용자의 실수 가능성을 낮추고, 알럿/툴팁을 활용한 저장 UX 개선.",
        "컴포넌트 분리 및 재사용: Angular + RxJS 기반의 상태 관리 체계를 설계하고, 점검 항목 컴포넌트를 독립화해 유지보수성과 확장성 확보.",
      ],
      tech: "Angular, RxJS, Ng-Zorro (Ant Design for Angular), Figma",
      link: "https://www.notion.so/CIS-1e76aba52d458062b9eee26179b644e7?pvs=21",
    },
    {
      title: "KICE(교육데이터 플랫폼)",
      period: "2024.08 ~ 2024.11 (4개월)",
      role: "KICE 교육 데이터 포털 시스템 프론트엔드 아키텍처 설계 및 리드 개발",
      achievements: [
        "라우팅 및 초기 렌더링 대응: 파일 기반 라우팅과 Next.js 내장 서버 사이드 기능을 활용해 탭·디테일 화면 등 데이터가 많은 구간의 초기 렌더링 속도를 개선",
        "대용량 데이터 대응: 다양한 코드북 구조에 따라 복잡한 통계 및 문서 자료를 시각화하고, 전체 검색 기능을 통해 정보 접근성을 향상",
        "UX 개선 및 퍼블리싱: Tailwind CSS 기반의 반응형 레이아웃 구현, 쿠키 기반 팝업 제어 및 관리자 화면의 UI를 직접 설계·개발하여 사용성 제고",
        "배포 환경 구성: 도커를 활용해 프론트엔드 애플리케이션을 이미지화하고, 사내 배포 환경에 맞게 설정·배포를 주도하여 배포 프로세스 안정화"
      ],
      tech: "React, Next.js, Tailwind CSS, Flowbite,ReactQuill, Docker",
      link: "https://example.com",
    },
    {
      title: "한국쌀가공식품협회(공급관리시스템)",
      period: "2024.02 ~ 2024.08 (6개월)",
      role: "공급관리시스템 통합 개발 및 업무 시스템 고도화 (프론트엔드 담당)",
      achievements: [
        "규제신고센터, 프로그램 룰관리 Tree 등 업무 특화 UI 신규 설계/개발",
        "조건 기반 비동기 로딩: 공급시기(시작일·종료일)가 입력되지 않으면 곡종 필드가 비활성화되고, 설정된 날짜를 기준으로 해당 기간 내 곡종만을 API로 호출하여 불필요한 데이터 로딩을 방지하고 초기 렌더링 성능을 개선함",
        "사용자 조건에 따른 버튼 제어 및 유효성 리팩토링으로 UX 개선",
        "REST API 설계 협업 및 Ant Design/PrimeNG UI 컴포넌트구현"
      ],
      tech: "Angular, PrimeNg, Ant Design(Ng-Zorro)",
      link: "https://www.notion.so/31f679ad3c8447dc8d771d62b078ff74?pvs=21",
    },
    {
      title: "삼성화재(Biz룰 모니터링 시스템)",
      period: "2023.10 ~ 2024.02 (5개월)",
      role: "Biz룰 모니터링 시스템 신규 구축 (프론트엔드 담당)",
      achievements: [
        "사내 전용 프레임워크(Nexus) 및 Vue2 기반 환경에 적응하며, 9개 주요 페이지의 반응형 UI 및 대시보드 구축",
        "알림 메시지 시각화: 발생 이벤트의 심각도(정보/경고/심각)를 구분하는 시각 요소 도입으로 실시간 알림 가독성 개선",
        "제한된 검색/문서 접근 환경 속 학습 극복: 내부 보안 정책으로 인해 외부 검색이 어려운 상황에서도 키워드 검색 + 자체 정리 방식으로 기술 역량 확보",
      ],
      tech: "Vue2, JavaScript, Chart.js, Jira, bitbucket",
      link: "https://example.com",
    },
    {
      title: "한국쌀가공식품협회 홈페이지(KRFA)",
      period: "2022.10 ~ 2023.10 (12개월)",
      role: "차세대 홈페이지 신규 개발/구축 및 유지보수 (프론트엔드 담당)",
      achievements: [
        "웹 접근성 개선: 반응형 미디어쿼리 설계, Figma 기반 HTML/CSS 구현",
        "사용자 경험 강화: Bootstrap 기반 컴포넌트 커스터마이징 및 동적 메뉴 구현",
        "관리 편의성: Thymeleaf 템플릿 엔진 적용으로 동적 메뉴 및 재사용 컴포넌트 설계",
      ],
      tech: "HTML, JavaScript, CSS, Thymeleaf, Bootstrap, Figma",
      link: "https://www.krfa.or.kr/",
    },
  ]

  const projects = [
    {
      title: "개인 블로그 플랫폼",
      description: "Next.js 15와 TypeScript 기반의 현대적인 개인 블로그 플랫폼입니다. React Markdown을 활용한 마크다운 기반 글 작성, 실시간 미리보기, 조회수 추적, 태그 시스템을 지원합니다. Supabase를 통한 안정적인 데이터 관리와 SEO 최적화, 반응형 디자인 지원으로 최적의 사용자 경험을 제공합니다.",
      image: "/img/jkBlog.png",
      tech: [    "Next.js 15", 
        "TypeScript", 
        "React 19",
        "Tailwind CSS", 
        "Shadcn UI",
        "Supabase",
        "React Markdown",
        "React Hook Form",
        "Zod"],
      link: "https://codedot-blog.vercel.app/",
    },
    {
      title: "날씨 정보 앱",
      description:
        "OpenWeather API를 활용한 실시간 날씨 정보 제공 앱입니다. 위치 기반 날씨 정보와 5일 예보를 제공합니다.",
      image: "/placeholder.svg?height=300&width=500",
      tech: ["React", "TypeScript", "OpenWeather API", "Styled-Components"],
      link: "https://example.com",
    },
  ]

  const skills = {
    Languages: ["JavaScript (ES6+)", "TypeScript"],
    "Frontend Frameworks": ["React", "Next.js", "Vue.js", "Angular", "RxJS"],
    "UI Libraries": ["Tailwind", "Styled-Components", "Ant Design", "PrimeNg"],
    "Tools & Others": ["Git/GitHub", "Figma", "Notion", "RESTful API"],
  }

  const AnimatedSection = ({ children, className = "" }) => {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: "-50px" })

    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={className}
      >
        {children}
      </motion.div>
    )
  }

  const CircularImageItem = ({ 
    img, 
    index, 
    scrollProgress, 
    circularPos, 
    linearPos 
  }) => {
    // 각 이미지마다 약간씩 다른 타이밍으로 부드러운 애니메이션
    const startProgress = 0.2 + (index * 0.05)
    const endProgress = 0.8 + (index * 0.02)
    
    // 선형에서 원형으로 변환하는 애니메이션
    const positionX = useTransform(scrollProgress, 
      [startProgress, endProgress], 
      [linearPos.x, circularPos.x]
    )
    
    const positionY = useTransform(scrollProgress, 
      [startProgress, endProgress], 
      [linearPos.y, circularPos.y]
    )
    
    // 원형이 될 때 둥근 모양으로 변경
    const borderRadius = useTransform(scrollProgress, 
      [0.1, 0.9], 
      [8, 50]
    )
    
    // 원형 배치 시 회전 효과
    const rotation = useTransform(scrollProgress, 
      [0.2, 1], 
      [0, (index % 2 === 0 ? 1 : -1) * (8 + index * 3)]
    )
    
    // 원형 변환 시 살짝 크기 변화
    const scale = useTransform(scrollProgress, 
      [0.1, 0.9], 
      [1, 0.98]
    )

    return (
      <motion.div
        className="absolute shadow-xl overflow-hidden"
        style={{
          x: positionX,
          y: positionY,
          rotate: rotation,
          scale,
          borderRadius,
          left: '50%',
          top: '50%',
          width: `${img.size.width}px`,
          height: `${img.size.height}px`,
          marginLeft: `-${img.size.width / 2}px`,
          marginTop: `-${img.size.height / 2}px`,
          willChange: 'transform',
          backfaceVisibility: 'hidden'
        }}
        whileHover={{
          scale: 1.05,
          zIndex: 30,
          transition: { duration: 0.3, ease: "easeOut" }
        }}
      >
        <Image
          src={img.src || "/placeholder.svg"}
          alt={img.alt}
          width={img.size.width}
          height={img.size.height}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <p className="text-white text-sm text-center font-light px-3 leading-relaxed">
            {img.alt}
          </p>
        </div>
      </motion.div>
    )
  }

  const CircularImageGrid = ({ images }) => {
    const { scrollY } = useScroll()
    const [sectionOffset, setSectionOffset] = useState(0)
    
    useEffect(() => {
      // Home 섹션의 위치 찾기
      const homeSection = document.getElementById("home")
      if (homeSection) {
        setSectionOffset(homeSection.offsetTop)
      }
    }, [])
    
    // Home 섹션 내에서 애니메이션 진행 - 더 긴 애니메이션 범위
    const sectionHeight = typeof window !== 'undefined' ? window.innerHeight * 4 : 4000
    
    // 부드러운 스크롤 진행도 계산
    const scrollProgress = useTransform(scrollY, 
      [sectionOffset + (typeof window !== 'undefined' ? window.innerHeight * 0.2 : 200), sectionOffset + sectionHeight * 0.8], 
      [0, 1]
    )

    // 중앙 텍스트가 더 자연스럽게 나타나도록
    const centerTextOpacity = useTransform(scrollY, 
      [sectionOffset + sectionHeight * 0.3, sectionOffset + sectionHeight * 0.6], 
      [0, 1]
    )
    
    // 원형 배치 위치 계산
    const getCircularPosition = (index, total) => {
      const radius = 320 // 원의 반지름
      const angle = (index / total) * 2 * Math.PI // 각도 계산
      
      return {
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * radius
      }
    }

    const getLinearPosition = (index, total) => {
      const totalImagesWidth = images.reduce((sum, img) => sum + img.size.width, 0)
      const spacing = 24 // 이미지 간격을 줄임 (40px → 24px)
      const totalSpacing = (total - 1) * spacing // 이미지 사이 간격의 총합
      
      // 각 이미지의 누적 위치 계산 (첫 번째 이미지부터 시작)
      let accumulatedWidth = -(totalImagesWidth + totalSpacing) / 2 // 중앙 정렬을 위한 시작점
      for (let i = 0; i < index; i++) {
        accumulatedWidth += images[i].size.width + spacing
      }
      
      return {
        x: accumulatedWidth + images[index].size.width / 2,
        y: 0
      }
    }

    return (
      <div 
        className="relative w-full flex items-center justify-center overflow-visible px-8 transition-all duration-1000 ease-out"
        style={{ 
          height: scrollProgress.get() > 0.3 ? '1000px' : '300px'
        }}
      >
        {/* 중앙 텍스트 */}
        <motion.div 
          className="absolute z-20 text-center"
          style={{ opacity: centerTextOpacity }}
        >
          <motion.h3 
            className="text-5xl font-light mb-6 transition-colors duration-500 text-amber-900 dark:text-white"
            style={{ 
              scale: useTransform(scrollProgress, [0.3, 0.7], [0.7, 1]),
              opacity: useTransform(scrollProgress, [0.3, 0.7], [0, 1])
            }}
          >
            Creative
            <br />
            Developer
          </motion.h3>
          <motion.p 
            className="text-lg font-light transition-colors duration-500 text-amber-800 dark:text-slate-300"
            style={{ 
              scale: useTransform(scrollProgress, [0.4, 0.8], [0.7, 1]),
              opacity: useTransform(scrollProgress, [0.4, 0.8], [0, 1])
            }}
          >
            기술과 감성의 균형
          </motion.p>
        </motion.div>

        {/* 이미지들 */}
        <div className="relative w-full h-full">
          {images.map((img, index) => {
            const circularPos = getCircularPosition(index, images.length)
            const linearPos = getLinearPosition(index, images.length)
            
            return (
              <CircularImageItem
                key={index}
                img={img}
                index={index}
                scrollProgress={scrollProgress}
                circularPos={circularPos}
                linearPos={linearPos}
              />
            )
          })}
        </div>
      </div>
    )
  }

  const HomeTextContent = ({ isDarkTheme, scrollToSection }) => {
    const { scrollY } = useScroll()
    const [sectionOffset, setSectionOffset] = useState(0)
    
    useEffect(() => {
      const homeSection = document.getElementById("home")
      if (homeSection) {
        setSectionOffset(homeSection.offsetTop)
      }
    }, [])

    // 스크롤 시작 시 텍스트가 위로 사라지는 애니메이션
    const textY = useTransform(scrollY, 
      [sectionOffset, sectionOffset + (typeof window !== 'undefined' ? window.innerHeight * 0.3 : 300)], 
      [0, -200]
    )
    
    const textOpacity = useTransform(scrollY, 
      [sectionOffset, sectionOffset + (typeof window !== 'undefined' ? window.innerHeight * 0.2 : 200)], 
      [1, 0]
    )

    return (
      <motion.div 
        className="max-w-4xl mb-0"
        style={{ 
          y: textY,
          opacity: textOpacity
        }}
      >
        <motion.h1
          className={`text-6xl lg:text-6xl font-light leading-tight mb-8 transition-colors duration-500 ${
            isDarkTheme ? "text-white" : "text-amber-900"
          }`}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Frontend Developer
        </motion.h1>
        <motion.p
          className={`text-xl font-light mb-6 leading-relaxed transition-colors duration-500 ${
            isDarkTheme ? "text-slate-300" : "text-amber-800"
          }`}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          개발은 적절한 기술, 경험, 그리고 섬세한 감각에서 완성된다고 생각합니다.
          <br/>사용자, 팀, 비즈니스를 이해하며
          더 나은 결과를 만드는 
          <br/>프론트엔드 개발자 김장겸입니다.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mb-4"
        >
          <Button
            className={`px-8 py-3 rounded-full font-light transition-colors duration-500 ${
              isDarkTheme 
                ? "bg-transparent border border-slate-600 text-slate-200 hover:bg-slate-700" 
                : "bg-amber-900 hover:bg-amber-800 text-[#f5f1eb]"
            }`}
            onClick={() => scrollToSection("work-experience")}
          >
            View My Work
            <ArrowUpRight className="ml-2 w-4 h-4" />
          </Button>
        </motion.div>
      </motion.div>
    )
  }

  const ImageSection = ({ images }) => {
    const { scrollY } = useScroll()
    const [sectionOffset, setSectionOffset] = useState(0)
    
    useEffect(() => {
      const homeSection = document.getElementById("home")
      if (homeSection) {
        setSectionOffset(homeSection.offsetTop)
      }
    }, [])

    // 텍스트가 사라지면서 이미지가 위로 올라오는 애니메이션 - 더 빠르고 많이 이동
    const imageY = useTransform(scrollY, 
      [sectionOffset, sectionOffset + (typeof window !== 'undefined' ? window.innerHeight * 0.2 : 200)], 
      [0, -200]
    )

    return (
      <motion.div
        className="w-full max-w-none mx-auto px-4 mt-12"
        style={{ y: imageY }}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1 }}
      >
        <CircularImageGrid images={images} />
      </motion.div>
    )
  }

  return (
    <div className="min-h-screen bg-[#f5f1eb] relative">
      {/* Global dark theme background overlay */}
      <motion.div
        className="fixed inset-0 z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: isDarkTheme ? 1 : 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        style={{
          background: 'linear-gradient(135deg, rgb(15 23 42) 0%, rgb(30 41 59) 50%, rgb(51 65 85) 100%)'
        }}
      />
      
      {/* Global pattern overlay for texture */}
      <motion.div
        className="fixed inset-0 z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: isDarkTheme ? 0.1 : 0 }}
        transition={{ duration: 1, ease: "easeInOut" }}
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.1) 1px, transparent 0)`,
          backgroundSize: '20px 20px'
        }}
      />
      
      {/* Dynamic Header with theme change */}
      <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        isDarkTheme 
          ? "bg-slate-900/95 backdrop-blur-sm" 
          : "bg-[#f5f1eb]/90 backdrop-blur-sm"
      }`}>
        <nav className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex justify-between items-center">
            <motion.div
              className={`text-xl font-light transition-colors duration-500 ${
                isDarkTheme ? "text-white" : "text-amber-900"
              }`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              KIM JANGKYUM
            </motion.div>
            <div className="hidden md:flex space-x-12">
              {[
                { id: "home", label: "Home" },
                { id: "work-experience", label: "Work" },
                { id: "project", label: "Projects" },
                { id: "skills", label: "Skills" },
                { id: "education", label: "Education" },
              ].map((item, index) => (
                <motion.button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-sm font-light transition-colors duration-500 ${
                    activeSection === item.id 
                      ? (isDarkTheme ? "text-amber-400" : "text-amber-900")
                      : (isDarkTheme ? "text-slate-300 hover:text-white" : "text-amber-700 hover:text-amber-900")
                  }`}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ 
                    y: -1,
                    transition: { duration: 0.15, ease: "easeOut" }
                  }}
                  style={{
                    willChange: 'transform',
                    backfaceVisibility: 'hidden'
                  }}
                >
                  {item.label}
                </motion.button>
              ))}
            </div>
          </div>
        </nav>
      </header>

      {/* Home Section */}
      <section id="home" className="relative z-10" style={{ height: '400vh' }}>
        <div className="max-w-7xl mx-auto relative z-10 w-full h-screen flex flex-col justify-center sticky top-0 pt-40">
          <div className="px-8">
            <HomeTextContent isDarkTheme={isDarkTheme} scrollToSection={scrollToSection} />
            
            {/* 이미지 애니메이션을 전체 너비로 확장 */}
            <ImageSection images={projectImages} />
          </div>
        </div>
      </section>

      {/* Work Experience Section */}
      <section id="work-experience" className="pt-80 pb-32 px-8 relative z-10"> {/* 상단 패딩 대폭 증가 */}
        <AnimatedSection className="relative z-10">
          <div className="max-w-7xl mx-auto">
            <div className="mb-20">
              <h2 className={`text-5xl font-light mb-6 transition-colors duration-500 ${
                isDarkTheme ? "text-white" : "text-amber-900"
              }`}>Work Experience</h2>
              <div className={`w-24 h-px transition-colors duration-500 ${
                isDarkTheme ? "bg-white/30" : "bg-amber-900/30"
              }`}></div>
            </div>

            <div className="mb-16">
              <h3 className={`text-2xl font-light mb-2 transition-colors duration-500 ${
                isDarkTheme ? "text-slate-200" : "text-amber-800"
              }`}>[싸이웰시스템] 프론트엔드 개발자(대리)</h3>
              <p className={`font-light transition-colors duration-500 ${
                isDarkTheme ? "text-slate-300" : "text-amber-700"
              }`}>2022.04 ~ 2025.04</p>
            </div>

            <div className="space-y-12">
              {workExperiences.map((exp, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  viewport={{ once: true, margin: "-50px" }}
                  className="group"
                >
                  <div className="backdrop-blur-sm rounded-2xl p-8 border bg-slate-800/50 border-slate-700/50 hover:border-slate-600/50 transition-all duration-500">
                    <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start mb-6">
                      <div className="flex-1">
                        <h4 className="text-2xl font-light mb-3 text-white">{exp.title}</h4>
                        <p className="mb-2 font-light text-slate-300">{exp.period}</p>
                        <p className="mb-6 font-light text-slate-300">{exp.role}</p>
                      </div>
                      {exp.link && exp.link !== "https://example.com" && (
                        <Button
                          variant="outline"
                          size="sm"
                          asChild
                          className="rounded-full bg-transparent border-slate-600 text-slate-200 hover:bg-slate-700 transition-colors duration-500"
                        >
                          <a href={exp.link} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="w-4 h-4 mr-2" />
                            View Project
                          </a>
                        </Button>
                      )}
                    </div>

                    <div className="mb-6">
                      <h5 className="font-medium mb-4 text-slate-200">주요 성과 및 업무</h5>
                      <ul className="space-y-2">
                        {exp.achievements.map((achievement, i) => (
                          <li key={i} className="font-light flex items-start text-slate-300">
                            <span className="w-1.5 h-1.5 bg-amber-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                            {index === 0 && i === 0 ? (
                              <span>
                                정기점검 모듈 개선: 기존 수기 입력 방식으로 인한 오류를 줄이기 위해{" "}
                                <a 
                                  href="https://www.notion.so/CIS-2-UI-UX-1ae6aba52d458082b2afde4fcf717e6a" 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="text-amber-400 hover:text-amber-300 underline transition-colors duration-200"
                                >
                                  점검주기 자동 계산
                                </a>
                                ,{" "}
                                <a 
                                  href="https://www.notion.so/CIS-1ac6aba52d45809a926bc2ac0558b3c3?pvs=21" 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="text-amber-400 hover:text-amber-300 underline transition-colors duration-200"
                                >
                                  상태 시각화
                                </a>
                                {" "}기능 도입.
                              </span>
                            ) : index === 0 && i === 1 ? (
                              <span>
                                UI/UX 리팩토링:{" "}
                                <a 
                                  href="https://www.notion.so/CIS-UX-1b66aba52d4580ad8893d54ab82f3955" 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="text-amber-400 hover:text-amber-300 underline transition-colors duration-200"
                                >
                                  버튼 조건 분리 및 날짜 자동 설정
                                </a>
                                으로 사용자의 실수 가능성을 낮추고, 알럿/툴팁을 활용한 저장 UX 개선.
                              </span>
                            ) : index === 1 && i === 1 ? (
                              <span>
                                대용량 데이터 대응: 다양한{" "}
                                <a 
                                  href="https://www.notion.so/Tab-Tab-1296aba52d458011a87fe30f721d5f96?pvs=4" 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="text-amber-400 hover:text-amber-300 underline transition-colors duration-200"
                                >
                                  코드북 구조
                                </a>
                                에 따라 복잡한 통계 및 문서 자료를 시각화하고, 전체 검색 기능을 통해 정보 접근성을 향상
                              </span>
                            ) : index === 1 && i === 2 ? (
                              <span>
                                UX 개선 및 퍼블리싱:{" "}
                                <a 
                                  href="https://www.notion.so/12f6aba52d45805c879fe6d1905a9d83" 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="text-amber-400 hover:text-amber-300 underline transition-colors duration-200"
                                >
                                  Tailwind CSS 기반의 반응형 레이아웃
                                </a>
                                {" "}구현, 쿠키 기반 팝업 제어 및 관리자 화면의 UI를 직접 설계·개발하여 사용성 제고
                              </span>
                            ) : index === 1 && i === 3 ? (
                              <span>
                                배포 환경 구성:{" "}
                                <a 
                                  href="https://www.notion.so/1-with-docker-10e6aba52d4580e69a91c5c6f8b7fc84?pvs=4" 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="text-amber-400 hover:text-amber-300 underline transition-colors duration-200"
                                >
                                  도커
                                </a>
                                를 활용해 프론트엔드 애플리케이션을 이미지화하고, 사내 배포 환경에 맞게 설정·배포를 주도하여 배포 프로세스 안정화
                              </span>
                            ) : index === 2 && i === 0 ? (
                              <span>
                                <a 
                                  href="https://www.notion.so/319fcb71ace343cdaaa86c4688f6ab62" 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="text-amber-400 hover:text-amber-300 underline transition-colors duration-200"
                                >
                                  규제신고센터
                                </a>
                                ,{" "}
                                <a 
                                  href="https://www.notion.so/467a848b6ed34bf7947cb721d1d66c97?pvs=4" 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="text-amber-400 hover:text-amber-300 underline transition-colors duration-200"
                                >
                                  프로그램 룰관리 Tree
                                </a>
                                {" "}등 업무 특화 UI 신규 설계/개발
                              </span>
                            ) : index === 2 && i === 1 ? (
                              <span>
                                <a 
                                  href="https://www.notion.so/610dcbeb8f3041a1bf053a34c4171524?pvs=4" 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="text-amber-400 hover:text-amber-300 underline transition-colors duration-200"
                                >
                                  조건 기반 비동기 로딩
                                </a>
                                : 공급시기(시작일·종료일)가 입력되지 않으면 곡종 필드가 비활성화되고, 설정된 날짜를 기준으로 해당 기간 내 곡종만을 API로 호출하여 불필요한 데이터 로딩을 방지하고 초기 렌더링 성능을 개선함
                              </span>
                            ) : index === 2 && i === 2 ? (
                              <span>
                                사용자 조건에 따른{" "}
                                <a 
                                  href="https://www.notion.so/Button-2bc7f712b9b64e4589f25776670cbec3?pvs=4" 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="text-amber-400 hover:text-amber-300 underline transition-colors duration-200"
                                >
                                  버튼 제어 및 유효성 리팩토링
                                </a>
                                으로 UX 개선
                              </span>
                            ) : (
                              achievement
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h5 className="font-medium mb-3 text-slate-200">사용 기술</h5>
                      <p className="font-light text-slate-300">{exp.tech}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </section>

      {/* Project Section */}
      <section id="project" className="py-32 px-8 bg-white/30 relative z-10">
        <AnimatedSection>
          <div className="max-w-7xl mx-auto">
            <div className="mb-20">
              <h2 className="text-5xl font-light mb-6 text-amber-900">Featured Projects</h2>
              <div className="w-24 h-px bg-amber-900/30"></div>
            </div>

            <div className="grid lg:grid-cols-2 gap-16">
              {projects.map((project, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ 
                    y: -5,
                    transition: { duration: 0.2, ease: "easeOut" }
                  }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true, margin: "-50px" }}
                  className="group cursor-pointer"
                  style={{
                    willChange: 'transform',
                    backfaceVisibility: 'hidden'
                  }}
                >
                  <div className="bg-white/70 backdrop-blur-sm rounded-2xl overflow-hidden border border-amber-200/50 hover:border-amber-300/50 transition-all duration-300">
                    <div className="aspect-[4/3] overflow-hidden bg-amber-50/50 flex items-center justify-center">
                      <Image
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        width={400}
                        height={300}
                        className="w-full h-full object-contain group-hover:scale-102 transition-transform duration-300 ease-out rounded-lg"
                        style={{
                          willChange: 'transform',
                          backfaceVisibility: 'hidden'
                        }}
                      />
                    </div>
                    <div className="p-8">
                      <h3 className="text-2xl font-light mb-4 text-amber-900">{project.title}</h3>
                      <p className="font-light mb-6 leading-relaxed text-amber-700">{project.description}</p>

                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.tech.map((tech, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 text-sm rounded-full font-light bg-amber-100/70 text-amber-800"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      <Button
                        variant="outline"
                        size="sm"
                        asChild
                        className="rounded-full bg-transparent border-amber-300 text-amber-800 hover:bg-amber-100 transition-colors duration-300"
                      >
                        <a href={project.link} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          View Project
                        </a>
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-32 px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: false, margin: "-100px" }}
          >
            <h2 className="text-5xl font-light text-amber-900 mb-6">Skills & Expertise</h2>
            <div className="w-24 h-px bg-amber-900/30"></div>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
            {Object.entries(skills).map(([category, skillList], index) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: false, margin: "-150px" }}
                className="bg-white/30 backdrop-blur-sm rounded-xl p-6 border border-amber-200/30"
              >
                <h3 className="text-xl font-light text-amber-900 mb-6">{category}</h3>
                <div className="space-y-3">
                  {skillList.map((skill, i) => (
                    <motion.div 
                      key={i} 
                      className="text-amber-700 font-light"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: (index * 0.1) + (i * 0.05) }}
                      viewport={{ once: false, margin: "-150px" }}
                    >
                      {skill}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-32 px-8 bg-white/30 relative z-10">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: false, margin: "-100px" }}
          >
            <h2 className="text-5xl font-light text-amber-900 mb-6">Education</h2>
            <div className="w-24 h-px bg-amber-900/30"></div>
          </motion.div>

          <div className="space-y-12">
            <motion.div 
              className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 border border-amber-200/50"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: false, margin: "-100px" }}
            >
              <h3 className="text-2xl font-light text-amber-900 mb-3">코드스테이츠 (Code States)</h3>
              <p className="text-amber-700 font-light mb-2">2021.08 ~ 2022.02</p>
              <p className="text-amber-800 font-medium mb-6">Software Engineering Bootcamp</p>
              <ul className="space-y-2">
                {[
                  "프론트엔드 개발 심화 과정 수료 (JavaScript, React)",
                  "Apang 프로젝트 - React 기반 병원 후기 서비스 개발", 
                  "Git/GitHub을 활용한 협업 및 버전 관리 경험"
                ].map((item, i) => (
                  <motion.li 
                    key={i}
                    className="text-amber-700 font-light flex items-start"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 + (i * 0.1) }}
                    viewport={{ once: false, margin: "-100px" }}
                  >
                    <span className="w-1.5 h-1.5 bg-amber-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    {item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div 
              className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 border border-amber-200/50"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: false, margin: "-100px" }}
            >
              <h3 className="text-2xl font-light text-amber-900 mb-3">내일배움 재직자 (그린컴퓨터 학원)</h3>
              <p className="text-amber-700 font-light mb-2">2020.02 ~ 2020.07</p>
              <p className="text-amber-800 font-medium mb-6">프론트엔드 개발 과정</p>
              <ul className="space-y-2">
                <motion.li 
                  className="text-amber-700 font-light flex items-start"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 }}
                  viewport={{ once: false, margin: "-100px" }}
                >
                  <span className="w-1.5 h-1.5 bg-amber-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  웹 개발 기본 과정 수료 (HTML, CSS, JavaScript)
                </motion.li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-8 bg-amber-900 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center space-x-8 mb-8">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#f5f1eb]/70 hover:text-[#f5f1eb] transition-colors"
            >
              <Github className="w-6 h-6" />
            </a>
            <a
              href="https://blog.example.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#f5f1eb]/70 hover:text-[#f5f1eb] transition-colors"
            >
              <FileText className="w-6 h-6" />
            </a>
            <a
              href="https://notion.so"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#f5f1eb]/70 hover:text-[#f5f1eb] transition-colors"
            >
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.046-.326L17.86 1.968c-.42-.326-.981-.7-2.055-.607L3.01 2.295c-.466.046-.56.28-.374.466l1.823 1.447zm.793 3.08v13.904c0 .747.373 1.027 1.214.98l14.523-.84c.841-.046.935-.56.935-1.167V6.354c0-.606-.233-.933-.748-.887l-15.177.887c-.56.047-.747.327-.747.933zm14.337.745c.093.42 0 .84-.42.888l-.7.14v10.264c-.608.327-1.168.514-1.635.514-.748 0-.935-.234-1.495-.933l-4.577-7.186v6.952L12.21 19s0 .84-1.168.84l-3.222.186c-.093-.186 0-.653.327-.746l.84-.233V9.854L7.822 9.76c-.094-.42.14-1.026.793-1.073l3.456-.233 4.764 7.279v-6.44l-1.215-.139c-.093-.514.28-.887.747-.933l3.268-.186z" />
              </svg>
            </a>
          </div>
          <div className="text-center text-[#f5f1eb]/50 font-light">© 2025 KIM JANGKYUM. All rights reserved.</div>
        </div>
      </footer>
    </div>
  )
}

"use client"

import React, { useEffect, useState, useRef } from "react"
import Image from "next/image"
import { Github, ExternalLink, FileText, ArrowUpRight, Eye, ChevronLeft, ChevronRight, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Modal } from "@/components/ui/modal"
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion"

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("home")
  const [isDarkTheme, setIsDarkTheme] = useState(false)
  const [selectedWork, setSelectedWork] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0)

  const projectImages = [
    { src: "/img/book.jpg", alt: "📚 책이 있는 시간이 좋아요", size: { width: 190, height: 320 } },
    { src: "/img/running.jpg", alt: "🏃 몸도 마음도 가벼워지는 시간", size: { width: 190, height: 320 } },
    { src: "/img/chue.JPG", alt: "🐶 츄랑 노는 게 제일 재밌어요", size: { width: 250, height: 320 } },
    { src: "/img/movie.jpg", alt: "🎬 좋은 영화는 언제 봐도 좋다", size: { width: 200, height: 320 } },
    { src: "/img/travel.JPG", alt: "🌍 새로운 풍경이 주는 리프레시", size: { width: 250, height: 320 } },
  ]

  const projects = [
    {
      title: "Pik2(밸런스 게임)",
      description: "두 가지 선택지 중 하나를 골라 다른 사람들과 비교할 수 있는 인터랙티브 웹 게임입니다. 다양한 카테고리의 질문을 통해 재미있고 의미 있는 선택의 순간을 제공하며, Recharts를 활용한 투표 결과 시각화와 Supabase를 통한 실시간 데이터베이스 연동으로 사용자들의 선택을 실시간으로 확인할 수 있습니다.",
      image: "/img/pik2.png",
      tech: [
        "Next.js 15",
        "TypeScript",
        "Tailwind",
        "Shadcn UI",
        "Radix UI",
        "Framer Motion",
        "React Hook Form",
        "Zod",
        "Supabase",
        "Recharts"
      ],
      link: "https://pik2.vercel.app/"
    },
    {
      title: "개인 블로그 플랫폼",
      description: "Next.js 15와 TypeScript 기반의 현대적인 개인 블로그 플랫폼입니다. React Markdown을 활용한 마크다운 기반 글 작성, 실시간 미리보기, 조회수 추적, 태그 시스템을 지원합니다. Supabase를 통한 안정적인 데이터 관리와 SEO 최적화, 반응형 디자인 지원으로 최적의 사용자 경험을 제공합니다.",
      image: "/img/jkblog.png",
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
      title: "Haru Class",
      description: "소규모 학원 및 개인 교습소 관리 웹 애플리케이션입니다. 출결 관리, 공지사항 전송, 학부모 소통을 하나의 플랫폼에서 효율적으로 처리할 수 있으며, 관리자와 학생/학부모를 위한 별도의 인터페이스를 제공합니다. Shadcn UI와 Radix UI를 활용한 모던한 디자인과 반응형 레이아웃으로 모바일 환경에 최적화되어 있으며, React Hook Form과 Zod를 통한 강력한 폼 유효성 검사를 구현했습니다.",
      image: "/img/haru-class.png",
      tech: [
        "Next.js 15 (App Router)",
        "TypeScript", 
        "Tailwind CSS",
        "Shadcn UI",
        "Radix UI",
        "React Hook Form",
        "date-fns",
        "Recharts",
        "Zod"
      ],
      link: "https://haru-class.vercel.app/"
    },
    {
      title: "Resume",
      description: "HTML5, CSS3, JavaScript 기반의 반응형 개인 Resume 웹사이트입니다. 프론트엔드 개발자로서의 경력과 기술 스택을 효과적으로 소개하며, 깔끔한 UI/UX와 모바일 최적화를 통해 전문적인 개발자 이미지를 구축합니다. CSS 변수 시스템과 미디어 쿼리를 활용한 현대적인 웹 표준을 준수합니다.",
      image: "/img/resume.png",
      tech: [
        "HTML5", 
        "CSS3", 
        "JavaScript (ES6+)",
        "CSS Variables",
        "ScrollReveal",
      ],
      link: "https://jangkyum.github.io/resume/"
    }
  ]

  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollPosition = window.scrollY
        
          const projectElement = document.getElementById("project")
          const workElement = document.getElementById("work-experience")
          
          if (projectElement && workElement) {
            const projectTop = projectElement.offsetTop
            const workTop = workElement.offsetTop
            
            if (scrollPosition + 400 >= projectTop) {
              if (activeSection !== "project") {
                setActiveSection("project")
                setIsDarkTheme(false)
              }
            }
            else if (scrollPosition + 300 >= workTop) {
              if (activeSection !== "work-experience") {
                setActiveSection("work-experience")
                setIsDarkTheme(true)
              }
            }
            else {
              const sections = ["home", "skills", "education"]
              for (const sectionId of sections) {
                const element = document.getElementById(sectionId)
                if (element) {
                  const offsetTop = element.offsetTop
                  const offsetHeight = element.offsetHeight

                  if (scrollPosition >= offsetTop - 100 && scrollPosition < offsetTop + offsetHeight + 100) {
                    if (activeSection !== sectionId) {
                      setActiveSection(sectionId)
                      setIsDarkTheme(false)
                    }
                    break
                  }
                }
              }
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    }

    handleScroll()
    
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [activeSection])

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const openWorkModal = (work) => {
    setSelectedWork(work)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedWork(null)
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
    linearPos,
    isMobile,
    isTablet,
    isDarkTheme
  }) => {
    // 반응형에 따른 타이밍 조정 - 이미지가 더 오래 보이도록 범위 확장
    const baseStartProgress = 0.1 + (index * 0.01)  
    const baseEndProgress = isMobile ? 0.5 + (index * 0.01) : isTablet ? 0.55 + (index * 0.01) : 0.6 + (index * 0.01)
    
    // 반응형 크기 조정
    const scaleFactor = isMobile ? 0.45 : isTablet ? 0.7 : 1
    const adjustedWidth = img.size.width * scaleFactor
    const adjustedHeight = img.size.height * scaleFactor
    
    // 선형에서 원형으로 변환하는 애니메이션
    const positionX = useTransform(scrollProgress, 
      [baseStartProgress, baseEndProgress], 
      [linearPos.x, circularPos.x]
    )
    
    const positionY = useTransform(scrollProgress, 
      [baseStartProgress, baseEndProgress], 
      [linearPos.y, circularPos.y]
    )
    
    // 투명도 제어 - 이미지가 완전히 흩어진 후에도 더 오래 보이도록 조정
    const opacity = useTransform(scrollProgress, 
      [0, 0.05, 0.8, 0.95, 1], 
      [1, 1, 1, 0.8, 0]
    )
    
    // 부드러운 스케일 애니메이션
    const scale = useTransform(scrollProgress, 
      [0, 0.9, 1], 
      [1, 0.98, 0.95]
    )

    return (
      <motion.div
        className="absolute"
        style={{
          x: positionX,
          y: positionY,
          scale,
          opacity,
          left: '50%',
          top: '50%',
          marginLeft: `-${adjustedWidth / 2}px`,
          marginTop: `-${adjustedHeight / 2}px`,
          willChange: 'transform'
        }}
      >
        {/* 이미지 */}
        <motion.div
          className="shadow-lg overflow-hidden rounded-lg"
          style={{
            width: `${adjustedWidth}px`,
            height: `${adjustedHeight}px`,
          }}
          whileHover={{
            scale: isMobile ? 1.02 : 1.05,
            zIndex: 30,
            transition: { duration: 0.2, ease: "easeOut" }
          }}
        >
          <Image
            src={img.src || "/placeholder.svg"}
            alt={img.alt}
            width={adjustedWidth}
            height={adjustedHeight}
            className="w-full h-full object-cover"
          />
        </motion.div>
        
        {/* 이미지 하단 텍스트 - 항상 표시 */}
        <motion.div
          className="absolute w-full text-center"
          style={{
            top: `${adjustedHeight + (isMobile ? 12 : 8)}px`,
          }}
        >
          <p className={`text-center font-light leading-relaxed transition-colors duration-500 ${
            isDarkTheme ? "text-slate-300" : "text-amber-800"
          } ${
            isMobile ? 'text-xs' : isTablet ? 'text-sm' : 'text-sm'
          }`}>
            {img.alt}
          </p>
        </motion.div>
      </motion.div>
    )
  }

  const CircularImageGrid = ({ images, isDarkTheme }) => {
    const { scrollY } = useScroll()
    const [sectionOffset, setSectionOffset] = useState(0)
    const [isMobile, setIsMobile] = useState(false)
    const [isTablet, setIsTablet] = useState(false)
    
    useEffect(() => {
      // Home 섹션의 위치 찾기
      const homeSection = document.getElementById("home")
      if (homeSection) {
        setSectionOffset(homeSection.offsetTop)
      }
      
      // 반응형 체크 함수
      const checkResponsive = () => {
        const width = window.innerWidth
        setIsMobile(width < 768)
        setIsTablet(width >= 768 && width < 1024)
      }
      
      checkResponsive()
      window.addEventListener('resize', checkResponsive)
      return () => window.removeEventListener('resize', checkResponsive)
    }, [])
    
    // 더 긴 애니메이션 범위로 부드러운 전환 - 범위를 더 늘림
    const sectionHeight = typeof window !== 'undefined' ? window.innerHeight * 2.5 : 2500
    
    // 부드러운 스크롤 진행도 계산 - 범위 확장
    const scrollProgress = useTransform(scrollY, 
      [sectionOffset, sectionOffset + sectionHeight], 
      [0, 1]
    )

    // 중앙 텍스트 애니메이션 - 더 늦게 나타나도록 조정
    const centerTextOpacity = useTransform(scrollY, 
      [sectionOffset + sectionHeight * 0.4, sectionOffset + sectionHeight * 0.7], 
      [0, 1]
    )
    
    // 흩어진 배치 위치 계산 - 반응형 대응
    const getScatteredPosition = (index) => {
      // 모바일에서는 더 안전하고 균형잡힌 배치
      if (isMobile) {
        const mobileScatteredPositions = [
          { x: -120, y: 150 },      // 왼쪽 (더 중앙 가까이)
          { x: 120, y: -70 },       // 오른쪽 위 (더 중앙 가까이)
          { x: -120, y: -70 },      // 왼쪽 위 (더 중앙 가까이)
          { x: 120, y: 150 },       // 오른쪽 (더 중앙 가까이)
          { x: 0, y: -70 },         // 중앙 위 (더 중앙 가까이)
        ]
        return mobileScatteredPositions[index] || { x: 0, y: 0 }
      }
      
      if (isTablet) {
        const tabletScatteredPositions = [
          { x: -140, y: 80 },     // 왼쪽 (더 안전한 위치로 조정)
          { x: 240, y: -100 },    // 오른쪽 위 (화면 밖으로 나가지 않도록 조정)
          { x: -240, y: -100 },   // 왼쪽 위 (화면 밖으로 나가지 않도록 조정)
          { x: 140, y: 80 },      // 오른쪽 (더 안전한 위치로 조정)
          { x: 0, y: -100 },      // 중앙 위 (더 안전한 위치로 조정)
        ]
        return tabletScatteredPositions[index] || { x: 0, y: 0 }
      }
      
      // 데스크톱 위치 - 자유로운 흩어진 배치
      const positions = [
        { x: -250, y: 100 },     // 중앙 위 (기존 -220에서 -120으로)
        { x: 480, y: -140 },    // 오른쪽 위 (기존 -160에서 -80으로)
        { x: -480, y: -140 },   // 왼쪽 위 (기존 -160에서 -80으로)
        { x: 270, y: 100 },    // 오른쪽 아래 (기존 120에서 180으로)
        { x: 0, y: -140 },   // 왼쪽 아래 (기존 120에서 180으로)
      ]
      
      return positions[index] || { x: 0, y: 0 }
    }

    const getLinearPosition = (index) => {
      // 반응형 이미지 크기 조정
      const scaleFactor = isMobile ? 0.45 : isTablet ? 0.7 : 1
      const adjustedImages = images.map(img => ({
        ...img,
        size: {
          width: img.size.width * scaleFactor,
          height: img.size.height * scaleFactor
        }
      }))
      
      // 모바일에서는 더 가지런한 2x3 그리드 (중앙 정렬) - 텍스트 겹침 방지를 위해 간격 대폭 증가
      if (isMobile) {
        const imageWidth = adjustedImages[index].size.width
        const imageHeight = adjustedImages[index].size.height
        const mobileHorizontalSpacing = 8   // 가로 간격 줄임 (12 → 8)
        const mobileVerticalSpacing = 45    // 세로 간격 약간 줄임 (50 → 45)
        
        // 첫 번째 행: 3개 이미지를 중앙 정렬 - 모바일 최적화
        // 두 번째 행: 2개 이미지를 중앙 정렬
        const mobileGridPositions = [
          // 첫 번째 행 (3개) - 더 중앙에 가깝게 배치
          { x: -imageWidth - mobileHorizontalSpacing, y: -imageHeight/2 - mobileVerticalSpacing/2 - 10 },  // 왼쪽
          { x: 0, y: -imageHeight/2 - mobileVerticalSpacing/2 - 10 },                                      // 중앙
          { x: imageWidth + mobileHorizontalSpacing, y: -imageHeight/2 - mobileVerticalSpacing/2 - 10 },   // 오른쪽
          
          // 두 번째 행 (2개) - 더 중앙에 가깝게 배치
          { x: -imageWidth/2 - mobileHorizontalSpacing/2, y: imageHeight/2 + mobileVerticalSpacing/2 + 15 }, // 왼쪽
          { x: imageWidth/2 + mobileHorizontalSpacing/2, y: imageHeight/2 + mobileVerticalSpacing/2 + 15 },  // 오른쪽
        ]
        return mobileGridPositions[index] || { x: 0, y: 0 }
      }
      
      // 태블릿에서는 더 가지런한 그리드 (중앙 정렬)
      if (isTablet) {
        const imageWidth = adjustedImages[index].size.width
        const imageHeight = adjustedImages[index].size.height
        const tabletHorizontalSpacing = 30  // 간격 조정
        const tabletVerticalSpacing = 35    // 간격 조정
        
        const tabletGridPositions = [
          // 첫 번째 행 (3개) - 완전히 중앙 정렬, 위로 이동
          { x: -imageWidth - tabletHorizontalSpacing, y: -imageHeight/2 - tabletVerticalSpacing/2 - 20 },   // 왼쪽
          { x: 0, y: -imageHeight/2 - tabletVerticalSpacing/2 - 20 },                                       // 중앙
          { x: imageWidth + tabletHorizontalSpacing, y: -imageHeight/2 - tabletVerticalSpacing/2 - 20 },    // 오른쪽
          
          // 두 번째 행 (2개) - 중앙 정렬, 위로 이동
          { x: -imageWidth/2 - tabletHorizontalSpacing/2, y: imageHeight/2 + tabletVerticalSpacing/2 - 20 }, // 왼쪽
          { x: imageWidth/2 + tabletHorizontalSpacing/2, y: imageHeight/2 + tabletVerticalSpacing/2 - 20 },  // 오른쪽
        ]
        return tabletGridPositions[index] || { x: 0, y: 0 }
      }
      
      // 데스크톱은 기존 선형 배치 - 위로 이동
      const totalImagesWidth = adjustedImages.reduce((sum, img) => sum + img.size.width, 0)
      const desktopSpacing = 20
      const totalSpacing = (images.length - 1) * desktopSpacing
      
      let accumulatedWidth = -(totalImagesWidth + totalSpacing) / 2
      for (let i = 0; i < index; i++) {
        accumulatedWidth += adjustedImages[i].size.width + desktopSpacing
      }
      
      return {
        x: accumulatedWidth + adjustedImages[index].size.width / 2,
        y: -20  // 데스크톱에서도 위로 이동
      }
    }

    return (
      <div 
        className="relative w-full flex items-center justify-center"
        style={{ 
          height: isMobile ? '650px' : isTablet ? '540px' : '600px',
          overflow: isMobile ? 'visible' : 'hidden',
          paddingLeft: isMobile ? '20px' : '0px',
          paddingRight: isMobile ? '20px' : '0px'
        }}
      >
        {/* 중앙 텍스트 */}
        <motion.div 
          className="absolute z-50 text-center"
          style={{ 
            opacity: centerTextOpacity,
            top: '80%',
            left: '50%',
            transform: 'translate(-50%, -50%)'
          }}
        >
          <motion.h3 
            className={`font-light mb-4 md:mb-6 transition-colors duration-500 text-amber-900 dark:text-white ${
              isMobile ? 'text-3xl' : isTablet ? 'text-4xl' : 'text-5xl'
            }`}
            style={{ 
              scale: useTransform(scrollProgress, [0.2, 0.5], [0.8, 1]),
              opacity: useTransform(scrollProgress, [0.2, 0.5], [0, 1])
            }}
          >
            Creative
            <br />
            Developer
          </motion.h3>
          <motion.p 
            className={`font-light transition-colors duration-500 text-amber-800 dark:text-slate-300 ${
              isMobile ? 'text-sm' : isTablet ? 'text-base' : 'text-lg'
            }`}
            style={{ 
              scale: useTransform(scrollProgress, [0.3, 0.6], [0.8, 1]),
              opacity: useTransform(scrollProgress, [0.3, 0.6], [0, 1])
            }}
          >
            기술과 감성의 균형
          </motion.p>
        </motion.div>

        {/* 이미지들 */}
        <div className="relative w-full h-full">
          {images.map((img, index) => {
            const scatteredPos = getScatteredPosition(index)
            const linearPos = getLinearPosition(index)
            
            return (
              <CircularImageItem
                key={index}
                img={img}
                index={index}
                scrollProgress={scrollProgress}
                circularPos={scatteredPos}
                linearPos={linearPos}
                isMobile={isMobile}
                isTablet={isTablet}
                isDarkTheme={isDarkTheme}
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

    // 텍스트 투명도와 위치 변경 - 스크롤 시작과 함께 즉시 반응
    const textOpacity = useTransform(scrollY, 
      [sectionOffset, sectionOffset + (typeof window !== 'undefined' ? window.innerHeight * 0.8 : 800)], 
      [1, 0]
    )

    const textY = useTransform(scrollY, 
      [sectionOffset, sectionOffset + (typeof window !== 'undefined' ? window.innerHeight * 0.6 : 600)], 
      [0, -30]
    )

    return (
      <motion.div
        className="max-w-4xl"
        style={{ 
          opacity: textOpacity,
          y: textY
        }}
      >
        <motion.h1
          className={`font-light leading-tight mb-4 md:mb-8 transition-colors duration-500 text-3xl md:text-5xl lg:text-6xl ${
            isDarkTheme ? "text-white" : "text-amber-900"
          }`}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Frontend Developer
        </motion.h1>
        <motion.p
          className={`font-light mb-4 md:mb-6 leading-relaxed transition-colors duration-500 text-sm md:text-xl ${
            isDarkTheme ? "text-slate-300" : "text-amber-800"
          }`}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          개발은 적절한 기술, 경험, 그리고 섬세한 감각에서 완성된다고 생각합니다.
          <br className="hidden md:block"/>
          <span className="md:hidden"> </span>사용자, 팀, 비즈니스를 이해하며 더 나은 결과를 만드는 
          <br className="hidden md:block"/>
          <span className="md:hidden"> </span>프론트엔드 개발자 김장겸입니다.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mb-4"
        >
          <Button
            className={`px-6 md:px-8 py-2 md:py-3 rounded-full font-light transition-colors duration-500 text-sm md:text-base ${
              isDarkTheme 
                ? "bg-transparent border border-slate-600 text-slate-200 hover:bg-slate-700" 
                : "bg-amber-900 hover:bg-amber-800 text-[#f5f1eb]"
            }`}
            onClick={() => scrollToSection("work-experience")}
          >
            View My Work
            <ArrowUpRight className="ml-2 w-3 h-3 md:w-4 md:h-4" />
          </Button>
        </motion.div>
      </motion.div>
    )
  }

  const ImageSection = ({ images, isDarkTheme }) => {
    return (
      <motion.div
        className="w-full max-w-none mx-auto"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1 }}
      >
        <CircularImageGrid images={images} isDarkTheme={isDarkTheme} />
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
        transition={{ duration: 1.2, ease: "easeInOut" }}
        style={{
          background: 'linear-gradient(135deg, rgb(15 23 42) 0%, rgb(30 41 59) 50%, rgb(51 65 85) 100%)'
        }}
      />
      
      {/* Global pattern overlay for texture */}
      <motion.div
        className="fixed inset-0 z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: isDarkTheme ? 0.1 : 0 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.1) 1px, transparent 0)`,
          backgroundSize: '20px 20px'
        }}
      />
      
      {/* Dynamic Header with theme change */}
      <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-1000 ${
        isDarkTheme 
          ? "bg-slate-900/95 backdrop-blur-sm" 
          : "bg-[#f5f1eb]/90 backdrop-blur-sm"
      }`}>
        <nav className="max-w-7xl mx-auto px-6 lg:px-8 py-3 md:py-5 lg:py-6">
          <div className="flex justify-between items-center">
            <motion.div
              className={`text-lg md:text-xl font-light transition-colors duration-500 ${
                isDarkTheme ? "text-white" : "text-amber-900"
              }`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              KIM JANGKYUM
            </motion.div>
            <div className="hidden md:flex space-x-8 lg:space-x-12">
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
              
              {/* PDF 다운로드 버튼 */}
              <motion.a
                href="/resume.pdf"
                download="김장겸-이력서.pdf"
                className={`flex items-center space-x-1 text-sm font-light transition-colors duration-500 ${
                  isDarkTheme ? "text-slate-300 hover:text-amber-400" : "text-amber-700 hover:text-amber-900"
                }`}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                whileHover={{ 
                  y: -1,
                  transition: { duration: 0.15, ease: "easeOut" }
                }}
                title="이력서 PDF 다운로드"
              >
                <Download className="w-3 h-3" />
                <span>PDF</span>
              </motion.a>
            </div>
          </div>
        </nav>
      </header>

      {/* Home Section */}
      <section id="home" className="relative z-10" style={{ height: '250vh' }}>
        <div className="max-w-7xl mx-auto relative z-10 w-full min-h-screen flex flex-col justify-center sticky top-0">
          <div className="px-6 lg:px-8 pt-16 md:pt-28 lg:pt-32 pb-8 md:pb-0">
            {/* 메인 텍스트 영역 - 모바일 최적화 */}
            <div className="mb-4 md:mb-6 lg:mb-8 mt-4 md:mt-12 lg:mt-16">
              <HomeTextContent isDarkTheme={isDarkTheme} scrollToSection={scrollToSection} />
            </div>
            
            {/* 이미지 영역 - 모바일에서 덜 올라가도록 조정 */}
            <div className="relative -mt-4 md:-mt-12 lg:-mt-16">
              <ImageSection images={projectImages} isDarkTheme={isDarkTheme} />
            </div>
          </div>
        </div>
        
        {/* 부드러운 전환을 위한 그라데이션 오버레이 */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-32 z-20"
          style={{
            background: isDarkTheme 
              ? 'linear-gradient(to bottom, transparent, rgba(15, 23, 42, 0.3))' 
              : 'linear-gradient(to bottom, transparent, rgba(245, 241, 235, 0.3))'
          }}
          animate={{
            background: isDarkTheme 
              ? 'linear-gradient(to bottom, transparent, rgba(15, 23, 42, 0.3))' 
              : 'linear-gradient(to bottom, transparent, rgba(245, 241, 235, 0.3))'
          }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
        />
      </section>

      {/* Work Experience Section */}
      <section id="work-experience" className="pt-20 md:pt-28 lg:pt-32 pb-20 md:pb-28 lg:pb-32 relative z-10">
        <AnimatedSection className="relative z-10">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="mb-12 md:mb-16 lg:mb-20">
              <h2 className={`text-3xl md:text-4xl lg:text-5xl font-light mb-4 md:mb-6 transition-colors duration-500 ${
                isDarkTheme ? "text-white" : "text-amber-900"
              }`}>Work Experience</h2>
              <div className={`w-16 md:w-20 lg:w-24 h-px transition-colors duration-500 ${
                isDarkTheme ? "bg-white/30" : "bg-amber-900/30"
              }`}></div>
            </div>

            <div className="mb-8 md:mb-12 lg:mb-16">
              <h3 className={`text-xl md:text-2xl font-light mb-2 transition-colors duration-500 ${
                isDarkTheme ? "text-slate-200" : "text-amber-800"
              }`}>[싸이웰시스템] 프론트엔드 개발자(대리)</h3>
              <p className={`text-sm md:text-base font-light transition-colors duration-500 ${
                isDarkTheme ? "text-slate-300" : "text-amber-700"
              }`}>2022.04 ~ 2025.04</p>
            </div>

            {/* Responsive Cards Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12">
              {workExperiences.map((exp, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  className="group cursor-pointer"
                  onClick={() => openWorkModal(exp)}
                >
                  <div className="backdrop-blur-sm rounded-xl md:rounded-2xl p-3 md:p-6 border bg-slate-800/50 border-slate-700/50 hover:border-slate-600/50 hover:bg-slate-800/70 transition-all duration-300 h-full flex flex-col">
                    <div className="flex-1">
                      <h4 className="text-base md:text-xl font-light mb-2 md:mb-3 text-white group-hover:text-amber-400 transition-colors duration-300">{exp.title}</h4>
                      <p className="text-xs md:text-sm mb-2 font-light text-slate-300">{exp.period}</p>
                      <p className="text-xs md:text-sm mb-3 md:mb-4 font-light text-slate-400 line-clamp-2 md:line-clamp-3">{exp.role}</p>
                      
                      {/* Responsive Tech tags */}
                      <div className="flex flex-wrap gap-1 md:gap-1.5 mb-3 md:mb-4">
                        {exp.tech.split(', ').slice(0, 3).map((tech, i) => (
                          <span
                            key={i}
                            className="px-2 py-1 text-xs rounded-md font-light bg-slate-700/50 text-slate-300"
                          >
                            {tech}
                          </span>
                        ))}
                        {exp.tech.split(', ').length > 3 && (
                          <span className="px-2 py-1 text-xs rounded-md font-light bg-slate-700/50 text-slate-300">
                            +{exp.tech.split(', ').length - 3}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Responsive Action Buttons */}
                    <div className="flex items-center justify-between mt-3 md:mt-4">
                      <Button
                        variant="outline"
                        size="sm"
                        className="rounded-full bg-transparent border-slate-600 text-slate-200 hover:bg-slate-700 transition-colors duration-300 text-xs px-3 py-1.5 md:px-4 md:py-2"
                      >
                        <Eye className="w-3 h-3 mr-1" />
                        자세히 보기
                      </Button>
                      {exp.link && exp.link !== "https://example.com" && (
                        <a 
                          href={exp.link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="text-slate-400 hover:text-amber-400 transition-colors duration-300"
                        >
                          <ExternalLink className="w-3 h-3 md:w-4 md:h-4" />
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </section>

      {/* Project Section */}
      <section id="project" className="py-20 md:py-28 lg:py-32 bg-white/30 relative z-10">
        <AnimatedSection>
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="mb-12 md:mb-16 lg:mb-20">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-light mb-4 md:mb-6 text-amber-900">Featured Projects</h2>
              <div className="w-16 md:w-20 lg:w-24 h-px bg-amber-900/30"></div>
            </div>

            {/* Responsive Project Slider */}
            <div className="relative">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center min-h-[400px] md:min-h-[500px] lg:min-h-[600px]">
                {/* Project Image - Full width on mobile, left side on desktop */}
                <div className="relative group order-2 lg:order-1">
                  <div className="aspect-[4/3] overflow-hidden bg-white/50 rounded-xl md:rounded-2xl border border-amber-200/50 shadow-xl">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={`image-${currentProjectIndex}`}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.05 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        className="w-full h-full"
                      >
                        <Image
                          src={projects[currentProjectIndex].image || "/placeholder.svg"}
                          alt={projects[currentProjectIndex].title}
                          width={600}
                          height={450}
                          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500 ease-out"
                        />
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>

                {/* Project Info - Full width on mobile, right side on desktop */}
                <div className="space-y-6 md:space-y-8 order-1 lg:order-2">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`content-${currentProjectIndex}`}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                      className="space-y-6 md:space-y-8"
                    >
                      <div>
                        <h3 className="text-xl md:text-3xl lg:text-4xl font-light mb-3 md:mb-6 text-amber-900">
                          {projects[currentProjectIndex].title}
                        </h3>
                        <p className="text-sm md:text-lg font-light leading-relaxed text-amber-700 mb-4 md:mb-8">
                          {projects[currentProjectIndex].description}
                        </p>
                      </div>

                      {/* Technologies - Responsive Grid */}
                      <div className="space-y-3 md:space-y-4">
                        <h4 className="text-lg md:text-xl font-medium text-amber-900">사용 기술</h4>
                        <div className="flex flex-wrap gap-2 md:gap-3">
                          {projects[currentProjectIndex].tech.map((tech, i) => (
                            <motion.span
                              key={`${currentProjectIndex}-${tech}-${i}`}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ duration: 0.3, delay: i * 0.05 }}
                              className="px-3 md:px-4 py-1.5 md:py-2 text-xs md:text-sm rounded-full font-light bg-amber-100/70 text-amber-800 border border-amber-200/50"
                            >
                              {tech}
                            </motion.span>
                          ))}
                        </div>
                      </div>

                      {/* Action Buttons - Responsive */}
                      <div className="flex gap-3 md:gap-4">
                        <Button
                          variant="outline"
                          asChild
                          className="rounded-full border-amber-300 text-amber-800 hover:bg-amber-100 px-4 md:px-6 py-2 md:py-3 text-sm md:text-base"
                        >
                          <a href={projects[currentProjectIndex].link} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="w-3 h-3 md:w-4 md:h-4 mr-2" />
                            프로젝트 보기
                          </a>
                        </Button>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              {/* Responsive Navigation Controls */}
              <div className="flex justify-center items-center gap-4 md:gap-6 lg:gap-8 mt-8 md:mt-12">
                <Button
                  onClick={() => {
                    setCurrentProjectIndex((prev) => (prev - 1 + projects.length) % projects.length)
                  }}
                  variant="outline"
                  className="rounded-full w-10 h-10 md:w-12 md:h-12 border-amber-300 text-amber-800 hover:bg-amber-100 transition-colors duration-300"
                  disabled={projects.length <= 1}
                >
                  <ChevronLeft className="w-4 h-4 md:w-6 md:h-6" />
                </Button>

                {/* Project Indicators - Responsive */}
                <div className="flex gap-2 md:gap-3">
                  {projects.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setCurrentProjectIndex(index)
                      }}
                      className={`w-2.5 h-2.5 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
                        index === currentProjectIndex
                          ? "bg-amber-800 scale-125"
                          : "bg-amber-300 hover:bg-amber-500"
                      }`}
                    />
                  ))}
                </div>

                <Button
                  onClick={() => {
                    setCurrentProjectIndex((prev) => (prev + 1) % projects.length)
                  }}
                  variant="outline"
                  className="rounded-full w-10 h-10 md:w-12 md:h-12 border-amber-300 text-amber-800 hover:bg-amber-100 transition-colors duration-300"
                  disabled={projects.length <= 1}
                >
                  <ChevronRight className="w-4 h-4 md:w-6 md:h-6" />
                </Button>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 md:py-28 lg:py-32 relative z-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div 
            className="mb-12 md:mb-16 lg:mb-20"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: false, margin: "-100px" }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-amber-900 mb-4 md:mb-6">Skills & Expertise</h2>
            <div className="w-16 md:w-20 lg:w-24 h-px bg-amber-900/30"></div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 lg:gap-12">
            {Object.entries(skills).map(([category, skillList], index) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: false, margin: "-150px" }}
                className="bg-white/30 backdrop-blur-sm rounded-lg md:rounded-xl p-4 md:p-6 border border-amber-200/30"
              >
                <h3 className="text-lg md:text-xl font-light text-amber-900 mb-4 md:mb-6 text-center">{category}</h3>
                <div className="flex flex-wrap justify-center gap-2 md:gap-3">
                  {skillList.map((skill, i) => {
                    // 자연스러운 등장 딜레이
                    const animationDelay = (index * 0.1) + (i * 0.08) + Math.random() * 0.2;
                    
                    return (
                      <motion.div 
                        key={i} 
                        className="px-3 md:px-5 py-2 md:py-2.5 bg-white/50 backdrop-blur-sm rounded-full border border-amber-300/50 text-amber-800 font-light cursor-default text-xs md:text-sm shadow-sm"
                        initial={{ 
                          opacity: 0, 
                          scale: 0.6,
                          y: 20
                        }}
                        whileInView={{ 
                          opacity: 1, 
                          scale: 1,
                          y: 0
                        }}
                        viewport={{ once: false, margin: "-50px" }}
                        transition={{
                          type: "spring",
                          stiffness: 120,
                          damping: 20,
                          mass: 0.5,
                          delay: animationDelay
                        }}
                      >
                        {skill}
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-20 md:py-28 lg:py-32 bg-white/30 relative z-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div 
            className="mb-12 md:mb-16 lg:mb-20"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: false, margin: "-100px" }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-amber-900 mb-4 md:mb-6">Education</h2>
            <div className="w-16 md:w-20 lg:w-24 h-px bg-amber-900/30"></div>
          </motion.div>

          <div className="space-y-6 md:space-y-8 lg:space-y-12">
            <motion.div 
              className="bg-white/70 backdrop-blur-sm rounded-lg md:rounded-xl lg:rounded-2xl p-4 md:p-6 lg:p-8 border border-amber-200/50"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: false, margin: "-100px" }}
            >
              <h3 className="text-xl md:text-2xl font-light text-amber-900 mb-2 md:mb-3">코드스테이츠 (Code States)</h3>
              <p className="text-sm md:text-base text-amber-700 font-light mb-1 md:mb-2">2021.08 ~ 2022.02</p>
              <p className="text-sm md:text-base text-amber-800 font-medium mb-4 md:mb-6">Software Engineering Bootcamp</p>
              <ul className="space-y-2 md:space-y-3">
                {[
                  "프론트엔드 개발 심화 과정 수료 (JavaScript, React)",
                  "Apang 프로젝트 - React 기반 병원 후기 서비스 개발", 
                  "Git/GitHub을 활용한 협업 및 버전 관리 경험"
                ].map((item, i) => (
                  <motion.li 
                    key={i}
                    className="text-sm md:text-base text-amber-700 font-light flex items-start"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 + (i * 0.1) }}
                    viewport={{ once: false, margin: "-100px" }}
                  >
                    <span className="w-1 h-1 md:w-1.5 md:h-1.5 bg-amber-400 rounded-full mt-2 mr-2 md:mr-3 flex-shrink-0"></span>
                    {item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div 
              className="bg-white/70 backdrop-blur-sm rounded-lg md:rounded-xl lg:rounded-2xl p-4 md:p-6 lg:p-8 border border-amber-200/50"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: false, margin: "-100px" }}
            >
              <h3 className="text-xl md:text-2xl font-light text-amber-900 mb-2 md:mb-3">내일배움 재직자 (그린컴퓨터 학원)</h3>
              <p className="text-sm md:text-base text-amber-700 font-light mb-1 md:mb-2">2020.02 ~ 2020.07</p>
              <p className="text-sm md:text-base text-amber-800 font-medium mb-4 md:mb-6">프론트엔드 개발 과정</p>
              <ul className="space-y-2 md:space-y-3">
                <motion.li 
                  className="text-sm md:text-base text-amber-700 font-light flex items-start"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 }}
                  viewport={{ once: false, margin: "-100px" }}
                >
                  <span className="w-1 h-1 md:w-1.5 md:h-1.5 bg-amber-400 rounded-full mt-2 mr-2 md:mr-3 flex-shrink-0"></span>
                  웹 개발 기본 과정 수료 (HTML, CSS, JavaScript)
                </motion.li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="footer-section" className="py-16 md:py-20 lg:py-24 bg-amber-900 relative z-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6 md:space-x-8 mb-6 md:mb-8">
            <a href="https://github.com/jangkyum" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 text-[#f5f1eb]/70 hover:text-[#f5f1eb] transition-colors">
              <Github className="w-4 h-4 md:w-5 md:h-5" />
              <span className="text-xs md:text-sm">Main GitHub</span>
            </a>
            <a href="https://github.com/codedot28" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 text-[#f5f1eb]/50 hover:text-[#f5f1eb] transition-colors">
              <Github className="w-4 h-4 md:w-5 md:h-5" />
              <span className="text-xs md:text-sm">Past Projects</span>
            </a>
            <a
              href="https://codedot-blog.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#f5f1eb]/70 hover:text-[#f5f1eb] transition-colors"
            >
              <FileText className="w-5 h-5 md:w-6 md:h-6" />
            </a>
            <a
              href="https://www.notion.so/Develop-List-43a42ab9966f4e068f57058d7b50b725"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#f5f1eb]/70 hover:text-[#f5f1eb] transition-colors"
            >
              <svg className="w-5 h-5 md:w-6 md:h-6 fill-current" viewBox="0 0 24 24">
                <path d="M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.046-.326L17.86 1.968c-.42-.326-.981-.7-2.055-.607L3.01 2.295c-.466.046-.56.28-.374.466l1.823 1.447zm.793 3.08v13.904c0 .747.373 1.027 1.214.98l14.523-.84c.841-.046.935-.56.935-1.167V6.354c0-.606-.233-.933-.748-.887l-15.177.887c-.56.047-.747.327-.747.933zm14.337.745c.093.42 0 .84-.42.888l-.7.14v10.264c-.608.327-1.168.514-1.635.514-.748 0-.935-.234-1.495-.933l-4.577-7.186v6.952L12.21 19s0 .84-1.168.84l-3.222.186c-.093-.186 0-.653.327-.746l.84-.233V9.854L7.822 9.76c-.094-.42.14-1.026.793-1.073l3.456-.233 4.764 7.279v-6.44l-1.215-.139c-.093-.514.28-.887.747-.933l3.268-.186z" />
              </svg>
            </a>
          </div>
          <div className="text-center text-[#f5f1eb]/50 font-light text-xs md:text-sm">© 2025 KIM JANGKYUM. All rights reserved.</div>
        </div>
      </footer>

      {/* Modal for Work Experience Details */}
      {selectedWork && (
        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
        >
          <div className="space-y-4 md:space-y-6">
            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start">
              <div className="flex-1">
                <h3 className="text-2xl md:text-3xl font-light mb-2 md:mb-3 text-white">{selectedWork.title}</h3>
                <p className="mb-1 md:mb-2 text-sm md:text-base font-light text-slate-300">{selectedWork.period}</p>
                <p className="mb-4 md:mb-6 text-sm md:text-base font-light text-slate-300">{selectedWork.role}</p>
              </div>
              {selectedWork.link && selectedWork.link !== "https://example.com" && (
                <Button
                  variant="outline"
                  size="sm"
                  asChild
                  className="rounded-full bg-transparent border-slate-600 text-slate-200 hover:bg-slate-700 transition-colors duration-500 text-xs md:text-sm mt-4 lg:mt-0"
                >
                  <a href={selectedWork.link} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-3 h-3 md:w-4 md:h-4 mr-2" />
                    View Project
                  </a>
                </Button>
              )}
            </div>

            {/* Achievements */}
            <div className="space-y-4 md:space-y-6">
              <h4 className="text-lg md:text-xl font-medium text-slate-200">주요 성과 및 업무</h4>
              <ul className="space-y-3 md:space-y-4">
                {selectedWork.achievements.map((achievement, i) => (
                  <li key={i} className="text-sm md:text-base font-light flex items-start text-slate-300">
                    <span className="w-1.5 h-1.5 md:w-2 md:h-2 bg-amber-400 rounded-full mt-2 mr-3 md:mr-4 flex-shrink-0"></span>
                    <span className="leading-relaxed">
                      {/* CIS 프로젝트 특별 링크 처리 */}
                      {selectedWork.title === "CIS(CywellSystem Information System)" && i === 0 ? (
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
                      ) : selectedWork.title === "CIS(CywellSystem Information System)" && i === 1 ? (
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
                      ) : selectedWork.title === "KICE(교육데이터 플랫폼)" && i === 1 ? (
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
                      ) : selectedWork.title === "KICE(교육데이터 플랫폼)" && i === 2 ? (
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
                      ) : selectedWork.title === "KICE(교육데이터 플랫폼)" && i === 3 ? (
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
                      ) : selectedWork.title === "한국쌀가공식품협회(공급관리시스템)" && i === 0 ? (
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
                      ) : selectedWork.title === "한국쌀가공식품협회(공급관리시스템)" && i === 1 ? (
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
                      ) : selectedWork.title === "한국쌀가공식품협회(공급관리시스템)" && i === 2 ? (
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
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Technologies */}
            <div className="space-y-3 md:space-y-4">
              <h4 className="text-lg md:text-xl font-medium text-slate-200">사용 기술</h4>
              <div className="flex flex-wrap gap-2">
                {selectedWork.tech.split(', ').map((tech, i) => (
                  <span
                    key={i}
                    className="px-2 md:px-3 py-1 md:py-2 text-xs md:text-sm rounded-lg font-light bg-slate-700/50 text-slate-300 border border-slate-600/30"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  )
}

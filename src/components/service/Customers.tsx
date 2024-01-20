import { twMerge } from "tailwind-merge"
import { Carousel } from "@mantine/carousel"
import { Trans } from "../common"


const persons = [
    {
        "id": 4,
        "name": "Tang Anh Tuan",
        "position": "CEO - Founder"
        
    },
    {
        "id": 4,
        "name": "Tang Anh Tuan",
        "position": "CEO - Founder"
    },
    {
        "id": 4,
        "name": "Tang Anh Tuan",
        "position": "CEO - Founder"
    },
    {
        "id": 4,
        "name": "Tang Anh Tuan",
        "position": "CEO - Founder"
    },
    {
        "id": 4,
        "name": "Tang Anh Tuan",
        "position": "CEO - Founder"
    }
]

const Personnel = ({ className = "" }) => {
    return (
        <section className={twMerge(`my-20 ${className}`)}>
            <div className="container m-auto px-4">
                <h2 className=" text-start text-4xl font-semibold mt-20 px-10">
                    {/* <Trans text="home.partner.title" /> */}
                    Đội ngũ nhân sự
                </h2>
                <Carousel
                    withIndicators
                    height={500}
                    slideSize={{ base: "100%", sm: "50%", md: "33.333333%" }}
                    slideGap={{ base: 0, sm: "md" }}
                    loop
                    align="start"
                    controlSize={40}
                >
                    {persons.map((person) => (
                        <Carousel.Slide key={person.id}>
                            <div className="h-full w-full mt-10">
                                <img
                                    src={"/about/personnel/person.png"}
                                    alt={person.name}
                                    className="object-contain mx-auto"
                                />
                                
                            </div>
                        </Carousel.Slide>
                    ))}
                </Carousel>
            </div>
        </section>
    )
}

export default Personnel

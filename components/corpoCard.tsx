"use client";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import {Corporation as CorporationType} from "@/types/corporation";
import { useRouter } from "next/navigation";
import Schedulas from './schedule';

interface DisplayProps{
  Corpo: CorporationType
};
const CorpoCard: React.FC <DisplayProps> = ({Corpo})=> {

  const router = useRouter();
  const handleClick = (corporationId:string) => {
        // router.push(`/category/${category.id}/product/${product.id}`, `/product/${product.id}`)}>
   
          router.push(`/pros/${corporationId}`);
      };
  return (
    <section className="w-full py-12">
      <div className="container px-4 md:px-6">
        <div className="flex items-center justify-between">
          <div className="flex space-x-4">
          </div>
        </div>
          <Card onClick={() => handleClick(Corpo._id)}   style={{
          backgroundImage: `url(${Corpo?.images?.[0]?.url || "/default_image.jpg"})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }} className="relative pl-1 h-40 group cursor-pointer"  >
            <CardHeader className="flex justify-between items-start">
            <div className="absolute top-0 right-0 p-0">
                <Schedulas Corpo={Corpo} />
                </div>
            </CardHeader>
           
          </Card>
          <p className="text-sm">{Corpo.name}</p>

      </div>
    </section>
  )
}
export default CorpoCard;




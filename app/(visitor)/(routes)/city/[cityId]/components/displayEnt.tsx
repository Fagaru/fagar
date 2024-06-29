/**
 * v0 by Vercel.
 * @see https://v0.dev/t/lZf7PrNz6Px
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"

export default function Component() {
  return (
    <section className="w-full py-12">
      <div className="container px-4 md:px-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">Featured Products</h1>
          <div className="flex space-x-4">
            <Button size="icon">
              <ArrowLeftIcon className="w-6 h-6" />
            </Button>
            <Button size="icon">
              <ArrowRightIcon className="w-6 h-6" />
            </Button>
          </div>
        </div>
        <div className="grid md:grid-cols-4 gap-4 lg:gap-6 xl:gap-8 items-start mt-8">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Product 1</CardTitle>
                <Badge>Status</Badge>
              </div>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <Avatar>
                <AvatarImage src="/placeholder-user.jpg" />
              </Avatar>
              <p className="text-gray-500 dark:text-gray-400 mt-2">Product 1 description</p>
            </CardContent>
            <CardFooter>
              <Link href="#" className="w-full" prefetch={false}>
                <Button size="lg">View</Button>
              </Link>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Product 2</CardTitle>
                <Badge>Status</Badge>
              </div>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <Avatar>
                <AvatarImage src="/placeholder-user.jpg" />
              </Avatar>
              <p className="text-gray-500 dark:text-gray-400 mt-2">Product 2 description</p>
            </CardContent>
            <CardFooter>
              <Link href="#" className="w-full" prefetch={false}>
                <Button size="lg">View</Button>
              </Link>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Product 3</CardTitle>
                <Badge>Status</Badge>
              </div>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <Avatar>
                <AvatarImage src="/placeholder-user.jpg" />
              </Avatar>
              <p className="text-gray-500 dark:text-gray-400 mt-2">Product 3 description</p>
            </CardContent>
            <CardFooter>
              <Link href="#" className="w-full" prefetch={false}>
                <Button size="lg">View</Button>
              </Link>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Product 4</CardTitle>
                <Badge>Status</Badge>
              </div>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <Avatar>
                <AvatarImage src="/placeholder-user.jpg" />
              </Avatar>
              <p className="text-gray-500 dark:text-gray-400 mt-2">Product 4 description</p>
            </CardContent>
            <CardFooter>
              <Link href="#" className="w-full" prefetch={false}>
                <Button size="lg">View</Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  )
}

function ArrowLeftIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m12 19-7-7 7-7" />
      <path d="M19 12H5" />
    </svg>
  )
}


function ArrowRightIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  )
}
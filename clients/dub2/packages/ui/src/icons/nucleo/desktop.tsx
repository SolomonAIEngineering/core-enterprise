import { SVGProps } from 'react'

export function Desktop(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      height="18"
      width="18"
      viewBox="0 0 18 18"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g fill="currentColor">
        <path
          d="M12.476,15.535c-.887-.279-1.803-.445-2.726-.504v-1.781c0-.414-.336-.75-.75-.75s-.75,.336-.75,.75v1.781c-.923,.06-1.839,.225-2.726,.504-.395,.125-.614,.545-.489,.941,.124,.394,.541,.612,.94,.49,1.958-.617,4.087-.618,6.049,0,.075,.023,.151,.035,.226,.035,.319,0,.614-.205,.716-.525,.124-.395-.096-.816-.49-.94Z"
          fill="#212121"
        />
        <path
          d="M14.25,14H3.75c-1.517,0-2.75-1.233-2.75-2.75V4.75c0-1.517,1.233-2.75,2.75-2.75H14.25c1.517,0,2.75,1.233,2.75,2.75v6.5c0,1.517-1.233,2.75-2.75,2.75ZM3.75,3.5c-.689,0-1.25,.561-1.25,1.25v6.5c0,.689,.561,1.25,1.25,1.25H14.25c.689,0,1.25-.561,1.25-1.25V4.75c0-.689-.561-1.25-1.25-1.25H3.75Z"
          fill="#212121"
        />
      </g>
    </svg>
  )
}
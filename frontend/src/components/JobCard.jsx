import style from "../styles/JobCard.module.css"

export const JobCard=({item})=>{
    return(
        <div className={style.container}>
            <div className={style.imgContainer}>
                <img className={style.img} src={item.imageUrl}/>
            </div>

            <div>
                <p className={style.name}>{item.name}</p>
            </div>

            <div>
                <p>Freelancers:{item.totalUsers}</p>
            </div>
        </div>
    )
}
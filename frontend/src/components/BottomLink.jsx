export function BottomLink({ contents, option, link }) {
    return (
      <div>
        <div>
          <div className="text-center font-bold">
            {contents}
            <a href={link} className="text-black underline">
              {option}
            </a>
          </div>
        </div>
      </div>
    );
  }
  
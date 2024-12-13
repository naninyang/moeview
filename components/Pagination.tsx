import React from 'react';
import Anchor from './Anchor';
import styles from '@/styles/Pagination.module.sass';

export function Pagination({
  sorting,
  category,
  tag,
  platform,
  hanguk,
  subdub,
  bfree,
  literature,
  currentPage,
  pageCount,
}: {
  sorting: string;
  category?: string;
  tag?: string;
  platform?: string;
  hanguk?: string;
  subdub?: string;
  bfree?: string;
  literature?: string;
  currentPage: number;
  pageCount: number;
}) {
  const pageLimit = 5;
  const currentGroup = Math.floor((currentPage - 1) / pageLimit);

  const startPage = currentGroup * pageLimit + 1;
  const endPage = Math.min(startPage + pageLimit - 1, pageCount);

  const prevGroupPage = startPage - 1;
  const nextGroupPage = endPage + 1;

  return (
    <>
      {endPage > startPage && (
        <div className={styles.pagination}>
          {currentGroup > 0 && (
            <div className={styles.pager}>
              {sorting === 'amusement' && (
                <>
                  {category && !tag && !hanguk && (
                    <Anchor href={`/amusement?category=${category}&page=${prevGroupPage}`}>
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M5 2.46484L1.46484 6L5 9.53516L5.75 8.78516L3.46484 6.5H10.5V5.5H3.46484L5.75 3.21484L5 2.46484Z"
                          fill="black"
                        />
                      </svg>
                      <span>이전</span>
                    </Anchor>
                  )}
                  {category && tag && (
                    <Anchor href={`/amusement?category=${category}&tag=${tag}&page=${prevGroupPage}`}>
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M5 2.46484L1.46484 6L5 9.53516L5.75 8.78516L3.46484 6.5H10.5V5.5H3.46484L5.75 3.21484L5 2.46484Z"
                          fill="black"
                        />
                      </svg>
                      <span>이전</span>
                    </Anchor>
                  )}
                  {!category && tag && (
                    <Anchor href={`/amusement?tag=${tag}&page=${prevGroupPage}`}>
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M5 2.46484L1.46484 6L5 9.53516L5.75 8.78516L3.46484 6.5H10.5V5.5H3.46484L5.75 3.21484L5 2.46484Z"
                          fill="black"
                        />
                      </svg>
                      <span>이전</span>
                    </Anchor>
                  )}
                  {platform && (
                    <Anchor href={`/amusement?platform=${platform}&page=${prevGroupPage}`}>
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M5 2.46484L1.46484 6L5 9.53516L5.75 8.78516L3.46484 6.5H10.5V5.5H3.46484L5.75 3.21484L5 2.46484Z"
                          fill="black"
                        />
                      </svg>
                      <span>이전</span>
                    </Anchor>
                  )}
                  {subdub && (
                    <Anchor href={`/amusement?subdub=${subdub}&page=${prevGroupPage}`}>
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M5 2.46484L1.46484 6L5 9.53516L5.75 8.78516L3.46484 6.5H10.5V5.5H3.46484L5.75 3.21484L5 2.46484Z"
                          fill="black"
                        />
                      </svg>
                      <span>이전</span>
                    </Anchor>
                  )}
                  {bfree && (
                    <Anchor href={`/amusement?bfree=${bfree}&page=${prevGroupPage}`}>
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M5 2.46484L1.46484 6L5 9.53516L5.75 8.78516L3.46484 6.5H10.5V5.5H3.46484L5.75 3.21484L5 2.46484Z"
                          fill="black"
                        />
                      </svg>
                      <span>이전</span>
                    </Anchor>
                  )}
                  {category && hanguk && (
                    <Anchor href={`/amusement?category=${category}&hanguk=${hanguk}&page=${prevGroupPage}`}>
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M5 2.46484L1.46484 6L5 9.53516L5.75 8.78516L3.46484 6.5H10.5V5.5H3.46484L5.75 3.21484L5 2.46484Z"
                          fill="black"
                        />
                      </svg>
                      <span>이전</span>
                    </Anchor>
                  )}
                  {!category && hanguk && (
                    <Anchor href={`/amusement?hanguk=${hanguk}&page=${prevGroupPage}`}>
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M5 2.46484L1.46484 6L5 9.53516L5.75 8.78516L3.46484 6.5H10.5V5.5H3.46484L5.75 3.21484L5 2.46484Z"
                          fill="black"
                        />
                      </svg>
                      <span>이전</span>
                    </Anchor>
                  )}
                  {literature && (
                    <Anchor href={`/amusement?bfree=${literature}&page=${prevGroupPage}`}>
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M5 2.46484L1.46484 6L5 9.53516L5.75 8.78516L3.46484 6.5H10.5V5.5H3.46484L5.75 3.21484L5 2.46484Z"
                          fill="black"
                        />
                      </svg>
                      <span>이전</span>
                    </Anchor>
                  )}
                </>
              )}
              {sorting === 'works' && (
                <Anchor href={`/works?page=${prevGroupPage}`}>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M5 2.46484L1.46484 6L5 9.53516L5.75 8.78516L3.46484 6.5H10.5V5.5H3.46484L5.75 3.21484L5 2.46484Z"
                      fill="black"
                    />
                  </svg>
                  <span>이전</span>
                </Anchor>
              )}
              {sorting === 'review' && (
                <Anchor href={`/reviews?page=${prevGroupPage}`}>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M5 2.46484L1.46484 6L5 9.53516L5.75 8.78516L3.46484 6.5H10.5V5.5H3.46484L5.75 3.21484L5 2.46484Z"
                      fill="black"
                    />
                  </svg>
                  <span>이전</span>
                </Anchor>
              )}
              {sorting === 'notice' && (
                <Anchor href={`/notices?page=${prevGroupPage}`}>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M5 2.46484L1.46484 6L5 9.53516L5.75 8.78516L3.46484 6.5H10.5V5.5H3.46484L5.75 3.21484L5 2.46484Z"
                      fill="black"
                    />
                  </svg>
                  <span>이전</span>
                </Anchor>
              )}
            </div>
          )}
          {Array.from({ length: endPage - startPage + 1 }).map((_, i) => {
            const pageNumber = startPage + i;
            return (
              <React.Fragment key={pageNumber}>
                <div
                  className={`${styles.pages} ${pageNumber === currentPage ? styles.current : ''} ${endPage > 99 ? styles.many : ''}`}
                >
                  {sorting === 'amusement' && (
                    <>
                      {category && !tag && !hanguk && (
                        <Anchor href={`/amusement?category=${category}&page=${pageNumber}`}>{pageNumber}</Anchor>
                      )}
                      {category && tag && (
                        <Anchor href={`/amusement?category=${category}&tag=${tag}&page=${pageNumber}`}>
                          {pageNumber}
                        </Anchor>
                      )}
                      {!category && tag && (
                        <Anchor href={`/amusement?tag=${tag}&page=${pageNumber}`}>{pageNumber}</Anchor>
                      )}
                      {platform && (
                        <Anchor href={`/amusement?platform=${platform}&page=${pageNumber}`}>{pageNumber}</Anchor>
                      )}
                      {subdub && <Anchor href={`/amusement?subdub=${subdub}&page=${pageNumber}`}>{pageNumber}</Anchor>}
                      {bfree && <Anchor href={`/amusement?bfree=${bfree}&page=${pageNumber}`}>{pageNumber}</Anchor>}
                      {category && hanguk && (
                        <Anchor href={`/amusement?hanguk=${hanguk}&category=${category}&page=${pageNumber}`}>
                          {pageNumber}
                        </Anchor>
                      )}
                      {!category && hanguk && (
                        <Anchor href={`/amusement?hanguk=${hanguk}&page=${pageNumber}`}>{pageNumber}</Anchor>
                      )}
                      {literature && (
                        <Anchor href={`/amusement?literature=${literature}&page=${pageNumber}`}>{pageNumber}</Anchor>
                      )}
                    </>
                  )}
                  {sorting === 'works' && <Anchor href={`/works?page=${pageNumber}`}>{pageNumber}</Anchor>}
                  {sorting === 'review' && <Anchor href={`/reviews?page=${pageNumber}`}>{pageNumber}</Anchor>}
                  {sorting === 'notice' && <Anchor href={`/notices?page=${pageNumber}`}>{pageNumber}</Anchor>}
                </div>
              </React.Fragment>
            );
          })}
          {currentGroup < Math.ceil(pageCount / pageLimit) - 1 && (
            <div className={`${styles.pager} ${currentGroup === 0 ? styles.pagerNext : ''}`}>
              {sorting === 'amusement' && (
                <>
                  {category && !tag && !hanguk && (
                    <Anchor href={`/amusement?category=${category}&page=${nextGroupPage}`}>
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M7 2.46484L6.25 3.21484L8.53516 5.5H1.5V6.5H8.53516L6.25 8.78516L7 9.53516L10.5352 6L7 2.46484Z"
                          fill="black"
                        />
                      </svg>
                      <span>다음</span>
                    </Anchor>
                  )}
                  {category && tag && (
                    <Anchor href={`/amusement?category=${category}&tag=${tag}&page=${nextGroupPage}`}>
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M7 2.46484L6.25 3.21484L8.53516 5.5H1.5V6.5H8.53516L6.25 8.78516L7 9.53516L10.5352 6L7 2.46484Z"
                          fill="black"
                        />
                      </svg>
                      <span>다음</span>
                    </Anchor>
                  )}
                  {!category && tag && (
                    <Anchor href={`/amusement?tag=${tag}&page=${nextGroupPage}`}>
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M7 2.46484L6.25 3.21484L8.53516 5.5H1.5V6.5H8.53516L6.25 8.78516L7 9.53516L10.5352 6L7 2.46484Z"
                          fill="black"
                        />
                      </svg>
                      <span>다음</span>
                    </Anchor>
                  )}
                  {platform && (
                    <Anchor href={`/amusement?platform=${platform}&page=${nextGroupPage}`}>
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M7 2.46484L6.25 3.21484L8.53516 5.5H1.5V6.5H8.53516L6.25 8.78516L7 9.53516L10.5352 6L7 2.46484Z"
                          fill="black"
                        />
                      </svg>
                      <span>다음</span>
                    </Anchor>
                  )}
                  {subdub && (
                    <Anchor href={`/amusement?subdub=${subdub}&page=${nextGroupPage}`}>
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M7 2.46484L6.25 3.21484L8.53516 5.5H1.5V6.5H8.53516L6.25 8.78516L7 9.53516L10.5352 6L7 2.46484Z"
                          fill="black"
                        />
                      </svg>
                      <span>다음</span>
                    </Anchor>
                  )}
                  {bfree && (
                    <Anchor href={`/amusement?bfree=${bfree}&page=${nextGroupPage}`}>
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M7 2.46484L6.25 3.21484L8.53516 5.5H1.5V6.5H8.53516L6.25 8.78516L7 9.53516L10.5352 6L7 2.46484Z"
                          fill="black"
                        />
                      </svg>
                      <span>다음</span>
                    </Anchor>
                  )}
                  {category && hanguk && (
                    <Anchor href={`/amusement?category=${category}&hanguk=${hanguk}&page=${nextGroupPage}`}>
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M7 2.46484L6.25 3.21484L8.53516 5.5H1.5V6.5H8.53516L6.25 8.78516L7 9.53516L10.5352 6L7 2.46484Z"
                          fill="black"
                        />
                      </svg>
                      <span>다음</span>
                    </Anchor>
                  )}
                  {!category && hanguk && (
                    <Anchor href={`/amusement?hanguk=${hanguk}&page=${nextGroupPage}`}>
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M7 2.46484L6.25 3.21484L8.53516 5.5H1.5V6.5H8.53516L6.25 8.78516L7 9.53516L10.5352 6L7 2.46484Z"
                          fill="black"
                        />
                      </svg>
                      <span>다음</span>
                    </Anchor>
                  )}
                  {literature && (
                    <Anchor href={`/amusement?literature=${literature}&page=${nextGroupPage}`}>
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M7 2.46484L6.25 3.21484L8.53516 5.5H1.5V6.5H8.53516L6.25 8.78516L7 9.53516L10.5352 6L7 2.46484Z"
                          fill="black"
                        />
                      </svg>
                      <span>다음</span>
                    </Anchor>
                  )}
                </>
              )}
              {sorting === 'works' && (
                <Anchor href={`/works?page=${nextGroupPage}`}>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M7 2.46484L6.25 3.21484L8.53516 5.5H1.5V6.5H8.53516L6.25 8.78516L7 9.53516L10.5352 6L7 2.46484Z"
                      fill="black"
                    />
                  </svg>
                  <span>다음</span>
                </Anchor>
              )}
              {sorting === 'review' && (
                <Anchor href={`/reviews?page=${nextGroupPage}`}>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M7 2.46484L6.25 3.21484L8.53516 5.5H1.5V6.5H8.53516L6.25 8.78516L7 9.53516L10.5352 6L7 2.46484Z"
                      fill="black"
                    />
                  </svg>
                  <span>다음</span>
                </Anchor>
              )}
              {sorting === 'notice' && (
                <Anchor href={`/notices?page=${nextGroupPage}`}>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M7 2.46484L6.25 3.21484L8.53516 5.5H1.5V6.5H8.53516L6.25 8.78516L7 9.53516L10.5352 6L7 2.46484Z"
                      fill="black"
                    />
                  </svg>
                  <span>다음</span>
                </Anchor>
              )}
            </div>
          )}
        </div>
      )}
    </>
  );
}
